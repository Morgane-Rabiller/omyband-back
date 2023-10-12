const sequelize =require( "sequelize");
const db = require("../db/db.js");

const { DataTypes } = sequelize;

const Role = db.define("roles", {
    role_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    name : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    },
    {
    timestamps: false
    }
);module.exports = Role;