const sequelize = require( "sequelize");
const db = require( "../db/db.js")

const { DataTypes } = sequelize;

const Style = db.define("styles", {
    style_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    name : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    image : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    },
    {
    timestamps: false
    }
);

module.exports = Style;