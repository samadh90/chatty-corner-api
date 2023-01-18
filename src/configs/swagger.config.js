const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");

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
          description:
            'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer { token }"',
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
  apis: [
    "./src/routes/*.route.js",
    "./src/models/*.js",
    "./src/models/schemas/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.info(`Swagger docs available at http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
