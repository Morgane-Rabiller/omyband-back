require('dotenv').config()
const router =require ('./router/index.js')
const express = require( 'express');
const db = require( './db/db.js');
//const { User, Role } = require('./models/associations.js');
const cors = require( 'cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig.js');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

const corsOptions = {
    origin: "*",
    methods: "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
    credentials: false,
    preflightContinue: false,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

app.use(cors(corsOptions));

app.use(router);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
db.sync().then(console.log("Connexion OK !!!")).catch(error => console.log(error));

app.listen(port, () => console.log("Run in Port : " + port));


