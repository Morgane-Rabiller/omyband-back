const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config()

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "O'MyBand API",
            version: '1.0.0',
            description: "O'MyBand API Documentation"
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            }
        ]
    },
    apis: ['./router/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;