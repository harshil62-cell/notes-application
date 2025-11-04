const express = require('express');
const { body } = require('express-validator'); 
const userController = require('../controllers/userController');

const router = express.Router();

const registerValidationRules = [
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    body('username')
        .notEmpty().withMessage('Username is required.')
        .trim()
];

router.post('/register', registerValidationRules, userController.registerUser);
router.post('/login', userController.loginUser); 

module.exports = router;