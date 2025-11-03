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

module.exports={
    createNote
};