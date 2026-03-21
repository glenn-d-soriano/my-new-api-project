const routes = require('express').Router();
const destController = require('../controllers/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// GET and POST
routes.get('/destinations', destController.getAll);
routes.post('/destinations', destController.createDestination);

// PUT and DELETE 
routes.put('/destinations/:id', destController.updateDestination);
routes.delete('/destinations/:id', destController.deleteDestination);

// Swagger Documentation
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = routes;