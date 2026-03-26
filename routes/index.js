const routes = require('express').Router();
const destController = require('../controllers/destinations');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');
//added 2nd controller user
const userController = require('../controllers/users');
const userValidation = require('../middleware/user-validate');
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');

// Home Route
routes.get('/', (req, res) => {
  res.send('Travel Destinations API is Running! Go to /api-docs for documentation.');
});

// Public Routes (Anyone can see these)
routes.get('/destinations', destController.getAll);
routes.get('/destinations/:id', destController.getSingle);

// Protected Routes (Must be logged in to access)
// Note: isAuthenticated must come BEFORE validation and controller
routes.delete('/destinations/:id', isAuthenticated, destController.deleteDestination);

routes.post(
  '/destinations', 
  isAuthenticated, // <--- Check login first
  validation.destinationValidationRules(), 
  validation.validate, 
  destController.createDestination
);

routes.put(
  '/destinations/:id', 
  isAuthenticated, // <--- Check login first
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

// 1. Login Route
routes.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

// 2. Logout Route
routes.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// 3. GitHub Callback Route
routes.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
    (req, res) => {
        req.session.user = req.user;
    res.redirect('/api-docs'); // Redirect back to Swagger after login
  }
);

// Swagger Documentation 
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = routes;