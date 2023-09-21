import sequelize from "sequelize";
import db from "../db/db.js"

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
});

export default Role;