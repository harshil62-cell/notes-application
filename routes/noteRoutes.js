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

router.post(
    '/create', 
    authMiddleware, 
    createNoteRules, 
    noteController.createNote
);


module.exports = router;