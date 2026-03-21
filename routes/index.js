const routes = require('express').Router();
const destController = require('../controllers/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');

// Home Route
routes.get('/', (req, res) => {
  res.send('Travel Destinations API is Running! Go to /api-docs for documentation.');
});

// Destinations Routes (GET and DELETE)
routes.get('/destinations', destController.getAll);
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

// Swagger Documentation 
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = routes;