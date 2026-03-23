const { body, validationResult } = require('express-validator');

const destinationValidationRules = () => {
  return [
    body('name').notEmpty().trim().withMessage('Name is required'),
    body('country').notEmpty().trim().withMessage('Country is required'),
    body('description').notEmpty().trim().withMessage('Description is required'),
    body('bestTimeToVisit').notEmpty().trim().withMessage('Best time to visit is required'),
    body('category').notEmpty().trim().withMessage('Category is required'),
    body('mustSee').notEmpty().trim().withMessage('Must see locations are required'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  // This formats the errors nicely for the browser/Swagger
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path || err.param]: err.msg }));

  return res.status(412).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors,
  });
};

module.exports = {
  destinationValidationRules,
  validate,
};