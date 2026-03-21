const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Travel Destinations API',
    description: 'API for managing my favorite travel spots'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);