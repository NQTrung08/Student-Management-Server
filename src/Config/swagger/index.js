const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const port = process.env.PORT;
const {app: {url}} = require('../app/index')

// Cấu hình Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for your Node.js application',
  },
  servers: [
    {
      url: `${url}/api`, // URL của server
    },
  ],
};

// Cấu hình Swagger UI
const options = {
  swaggerDefinition,
  apis: [
    path.join(__dirname, '../../Routes/*.js'), // This path should match your route files
  ],
};

console.log(options.apis);

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
