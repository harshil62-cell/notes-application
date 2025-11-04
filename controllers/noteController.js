const { validationResult } = require('express-validator');
const Note = require('../models/notesModel');

const createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
    }
    try {
        const { title, content, colorLabel } = req.body;
        const userId = req.user.id;
        const note = new Note({
            user: userId,  
            title,
            content,
            colorLabel
        });

        const savedNote = await note.save();

        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            note: savedNote
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not create note'
        });
    }
};

const updateNote = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            errors: errors.array() 
        });
    }

    try {

        const { noteId } = req.params;

        const { title, content, colorLabel, isPinned, isArchived } = req.body;

        const userId = req.user.id;

        
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        if (note.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have permission to edit this note'
            });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (colorLabel) note.colorLabel = colorLabel;
        
        if (isPinned !== undefined) note.isPinned = isPinned;
        if (isArchived !== undefined) note.isArchived = isArchived;

        const updatedNote = await note.save();

        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            note: updatedNote
        });

    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
             return res.status(400).json({
                success: false,
                message: 'Invalid Note ID format'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not update note'
        });
    }
};

const deleteNote=async(req,res)=>{
    try {
        
        const { noteId } = req.params;

        const userId = req.user.id;

        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }


        if (note.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have permission to delete this note'
            });
        }


        await Note.deleteOne({ _id: noteId });

        res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });

    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
             return res.status(400).json({
                success: false,
                message: 'Invalid Note ID format'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not delete note'
        });
    }
};

const sendAllNotes=async(req,res)=>{
    try {
        
        const userId = req.user.id;

        const notes = await Note.find({ 
            user: userId,
            isArchived: false
        }).sort({ isPinned: -1, lastEdited: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            notes: notes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not retrieve notes'
        });
    }
}

const searchNotesByKeyword=async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array() 
        });
    }

    try {

        const { q } = req.query;

        const userId = req.user.id;

        const query = {
            user: userId, //Only search notes for the logged-in user
            $text: { 
                $search: q //Use the text index to search 'title' and 'content'
            } 
        };

        // We sort by 'isPinned' first, then by 'lastEdited'
        const notes = await Note.find(query)
            .sort({ isPinned: -1, lastEdited: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            notes: notes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not perform search'
        });
    }
};

module.exports={
    createNote,updateNote,deleteNote,searchNotesByKeyword,sendAllNotes
};