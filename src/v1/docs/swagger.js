const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "API for user authentication",
    },
    servers: [
      {
        url: `http://localhost:${process.envPORT}/v1`,
        description: "API version 1",
      },
    ],
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
  },
  apis: ["./src/v1/docs/*.js"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app, port) => {
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};

module.exports = setupSwaggerDocs;
