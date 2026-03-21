const routes = require('express').Router();
const destController = require('../controllers/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');

// Home Route (This fixes the 404 error!) 
routes.get('/', (req, res) => {
  res.send('Travel Destinations API is Running! Go to /api-docs for documentation.');
});

// Destinations Routes 
routes.get('/destinations', destController.getAll);
routes.post('/destinations', destController.createDestination);
routes.put('/destinations/:id', destController.updateDestination);
routes.delete('/destinations/:id', destController.deleteDestination);

// Swagger Documentation 
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));



// Validation rules and the validate checker to POST and PUT
routes.post('/destinations', validation.destinationValidationRules(), validation.validate, destController.createDestination);
routes.put('/destinations/:id', validation.destinationValidationRules(), validation.validate, destController.updateDestination);

module.exports = routes;