const { body, validationResult } = require('express-validator');
exports.registerUserValidation = [
  body('firstName')
    .notEmpty().withMessage('First name is required'),
  
  body('lastName')
    .notEmpty().withMessage('Last name is required'),

  body('email')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.loginUserValidations=[
    body('email')
    .isEmail().withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]