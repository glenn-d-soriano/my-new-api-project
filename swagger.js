const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My New API Project',
    description: 'Destinations and Users API with OAuth',
  },
  host: 'my-new-api-project-206i.onrender.com', // Your Render Link
  schemes: ['https'],
  // THIS PART IS KEY FOR THE RUBRIC:
  securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      flow: 'implicit',
      scopes: {
        read: 'read your profile',
        write: 'modify your profile'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);