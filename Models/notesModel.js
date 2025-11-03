const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    // Establish relationship to the User model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Indexing by user for faster queries
    },
    title: {
        type: String,
        required: [true, 'Note title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Note content is required']
    },
    colorLabel: {
        type: String,
        trim: true,
        default: '#FFFFFF' // Default white color
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    }
}, {
    // Use Mongoose's built-in timestamps
    // `updatedAt` will serve as the "last edited" timestamp
    timestamps: { updatedAt: 'lastEdited' } 
});

// Create a text index for searching title and content
noteSchema.index({ title: 'text', content: 'text' });

module.exports=mongoose.model('Note',noteSchema);

//note for myself
// index: true on user: Makes finding all notes for a specific user very fast. (Like a book's index for a topic).

// noteSchema.index({ ... }) with text: Creates a search engine for the title and content fields. (Like a book's word search).