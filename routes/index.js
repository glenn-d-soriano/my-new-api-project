const routes = require('express').Router();
const destController = require('../controllers/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');
//added 2nd controller user
const userController = require('../controllers/users');
const userValidation = require('../middleware/user-validate');

// Home Route
routes.get('/', (req, res) => {
  res.send('Travel Destinations API is Running! Go to /api-docs for documentation.');
});

// Destinations Routes (GET and DELETE)
routes.get('/destinations', destController.getAll);
routes.get('/destinations/:id', destController.getSingle);
routes.delete('/destinations/:id', destController.deleteDestination);

// Validation Rules applied to POST and PUT 
routes.post(
  '/destinations', 
  validation.destinationValidationRules(), 
  validation.validate, 
  destController.createDestination
);

routes.put(
  '/destinations/:id', 
  validation.destinationValidationRules(), 
  validation.validate, 
  destController.updateDestination
);



// User Routes
routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getSingle);
routes.post('/users', userValidation.userValidationRules(), userValidation.validate, userController.createUser);
routes.put('/users/:id', userValidation.userValidationRules(), userValidation.validate, userController.updateUser);
routes.delete('/users/:id', userController.deleteUser);

// Swagger Documentation 
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = routes;