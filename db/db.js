import { Sequelize } from "sequelize";
import 'dotenv/config';

export default new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {dialect : 'postgres', host : 'localhost'});