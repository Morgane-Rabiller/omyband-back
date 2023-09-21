import 'dotenv/config';
import router from './router/index.js'
import express from 'express';
import db from './db/db.js';
import { User, Role } from './models/associations.js'

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(router);

db.sync().then(console.log("Connexion OK !!!")).catch(error => console.log(error));

app.listen(port, () => console.log("Run in Port : " + port));