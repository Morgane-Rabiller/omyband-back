import sequelize from "sequelize";
import db from "../db/db.js"

const { DataTypes } = sequelize;

const Type = db.define("types", {
    type_id : {
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
);

export default Type;