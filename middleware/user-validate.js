const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('firstName').notEmpty().trim().withMessage('First name is required'),
    body('lastName').notEmpty().trim().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('favoriteColor').notEmpty().trim().withMessage('Favorite color is required'),
    body('birthday').notEmpty().withMessage('Birthday is required')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

module.exports = { userValidationRules, validate };