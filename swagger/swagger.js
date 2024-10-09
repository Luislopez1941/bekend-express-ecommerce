const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
      description: 'API for managing Jedi',
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
  apis: ['./routes/*.js'], // Busca todos los archivos en la carpeta routes
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
