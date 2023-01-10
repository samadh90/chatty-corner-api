const swaggerJsdoc = require('swagger-jsdoc');

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Chatty Corner API',
      version: '1.0.0',
      description: 'API for the "Chatty Corner" chat web application'
    },
    servers: [{url: `http://localhost:3000`}],
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);
module.exports = specs;