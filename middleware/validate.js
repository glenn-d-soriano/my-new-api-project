const { body, validationResult } = require('express-validator');

const destinationValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(412).json({ errors: errors.array() });
};

module.exports = {
  destinationValidationRules,
  validate,
};