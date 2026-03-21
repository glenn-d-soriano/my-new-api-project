const routes = require('express').Router();
const destController = require('../controllers/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// --- 1. Home Route (This fixes the 404 error!) ---
routes.get('/', (req, res) => {
  res.send('Travel Destinations API is Running! Go to /api-docs for documentation.');
});

// --- 2. Destinations Routes ---
routes.get('/destinations', destController.getAll);
routes.post('/destinations', destController.createDestination);
routes.put('/destinations/:id', destController.updateDestination);
routes.delete('/destinations/:id', destController.deleteDestination);

// --- 3. Swagger Documentation (The standard setup) ---
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = routes;