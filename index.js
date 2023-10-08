import 'dotenv/config';
import router from './router/index.js'
import express from 'express';
import db from './db/db.js';
import { User, Role } from './models/associations.js'
import cors from 'cors';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());

const corsOptions = {
    origin: "*",
    methods: "GET, HEAD, POST, PATCH, DELETE, OPTIONS",
    credentials: false,
    preflightContinue: false,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};
  
app.use(cors(corsOptions));

app.use(router);

db.sync().then(console.log("Connexion OK !!!")).catch(error => console.log(error));

app.listen(port, () => console.log("Run in Port : " + port));


