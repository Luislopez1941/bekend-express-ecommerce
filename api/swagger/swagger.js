const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      customCss: '.swagger-ui .topbar { display: none }',
      title: 'API for managing Ecommerce',
      version: '1.0.0',
      description: 'API for managing Ecommerce',
      contact: {
        name: 'Luis Lopez',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000/',
        description: 'Local server',
      },
    ],
  },
  apis: ['./api/routes/**/*.js'], // Busca archivos dentro de api/routes
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
