const { body, validationResult } = require('express-validator');
exports.courseValidation = [
  body('title')
    .notEmpty().withMessage('Title is required'),
  
  body('description')
    .notEmpty().withMessage('Description is required'),

  body('duration')
    .notEmpty().withMessage('Duration is required'),
];