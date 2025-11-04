const express = require('express');
const router = express.Router();
const { body,query } = require('express-validator');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware'); 


const createNoteRules = [
    body('title')
        .notEmpty().withMessage('Title is required.')
        .trim(),
    body('content')
        .notEmpty().withMessage('Content is required.')
        .trim(),
    body('colorLabel')
        .optional() 
        .trim()
        .isHexColor().withMessage('Color label must be a valid hex color (e.g., #FFFFFF)')
];

const updateNoteRules = [
    body('title')
        .optional()
        .notEmpty().withMessage('Title cannot be empty.')
        .trim(),
    body('content')
        .optional()
        .notEmpty().withMessage('Content cannot be empty.')
        .trim(),
    body('colorLabel')
        .optional()
        .trim()
        .isHexColor().withMessage('Color label must be a valid hex color (e.g., #FFFFFF)'),
    body('isPinned')
        .optional()
        .isBoolean().withMessage('isPinned must be a boolean value (true or false)'),
    body('isArchived')
        .optional()
        .isBoolean().withMessage('isArchived must be a boolean value (true or false)')
];

const searchNoteRules = [
    query('q')
        .notEmpty().withMessage('Search query "q" is required.')
        .trim()
        .escape()
];

router.post(
    '/create', 
    authMiddleware, 
    createNoteRules, 
    noteController.createNote
);

router.put(
    '/:noteId',
    authMiddleware,
    updateNoteRules,
    noteController.updateNote
);

router.delete(
    '/:noteId',
    authMiddleware,
    noteController.deleteNote
);

router.get(
    '/search',
    authMiddleware,
    searchNoteRules,
    noteController.searchNotesByKeyword
);

router.get('/',authMiddleware,noteController.sendAllNotes);


module.exports = router;