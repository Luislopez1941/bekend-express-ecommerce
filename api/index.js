'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.2/swagger-ui.min.css";
const openapiSpecification = require('./swagger/swagger.js'); // Cambia esto según tu estructura de carpetas
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// Rutas
const customerRouter = require('./routes/Customer.js');
const administratorRouter = require('./routes/Administrator.js');

app.use('/api', customerRouter);
app.use('/api', administratorRouter);


// app.get('/', (req, res) => {
//     res.redirect('/api-docs');
// });
// Swagger
app.use(express.static('public')); 

var options = {
    customCssUrl: CSS_URL,
    customCss: `
        .operation-tag-content > span > div > divc > button > div {
            align-items: center;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0 10px;
            padding: 0 10px;
            width: 100%;
        }
    `,
    swaggerOptions: {
        docExpansion: 'none',
        filter: true,
        showRequestHeaders: true
    },
    customSiteTitle: 'Mi API Documentación'
};

app.use('/', swaggerUi.serve, swaggerUi.setup(openapiSpecification, options));

// Conectar a la base de datos
async function connectDB() {
    try {
        const dbUrl = process.env.MONGODB_URI;
        
        await mongoose.connect(dbUrl);
        console.log('Server running and database connected');
        
        // Iniciar el servidor
        app.listen(port, function () {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}

// Exporta la función de conexión
connectDB();
module.exports = app;
