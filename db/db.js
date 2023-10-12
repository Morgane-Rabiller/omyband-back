const { Sequelize } =require("sequelize");
require('dotenv').config();

module.exports = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {dialect : 'postgres', host : 'localhost'});