const swaggerJsdoc = require("swagger-jsdoc");

// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chatty Corner API",
      version: "1.0.0",
      description: 'API for the "Chatty Corner" chat web application',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [{ url: `http://localhost:3000` }],
  },
  apis: ["./src/routes/*.route.js", "./src/models/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
