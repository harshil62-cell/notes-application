const express = require('express');
const { body } = require('express-validator'); 
const userController = require('../controllers/userController');

const router = express.Router();

const registerValidationRules = [
    // 1. Email Validation
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail(), // This is a sanitizer: it cleans the email (e.g., 'Test@GMAIL.com' -> 'test@gmail.com')

    // 2. Password Validation
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),

    // 3. Username Validation
    body('username')
        .notEmpty().withMessage('Username is required.')
        .trim() // This is a sanitizer: it removes whitespace
];

router.post('/register', registerValidationRules, userController.registerUser);
router.post('/login', userController.loginUser); 

module.exports = router;