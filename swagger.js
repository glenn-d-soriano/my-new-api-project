const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Travel Destinations API',
    description: 'API for managing my favorite travel spots'
  },
  host: 'my-new-api-project-206i.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);