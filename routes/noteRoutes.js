const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware'); // <-- Import the middleware


const createNoteRules = [
    body('title')
        .notEmpty().withMessage('Title is required.')
        .trim(),
    body('content')
        .notEmpty().withMessage('Content is required.')
        .trim(),
    body('colorLabel')
        .optional() // This field is not required
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


module.exports = router;