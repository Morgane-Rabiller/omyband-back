const sequelize =require("sequelize");
const db = require("../db/db.js");

const { DataTypes } = sequelize;

const User = db.define("users", {
    user_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    role_id : {
        type : DataTypes.INTEGER,
        references : {
            model: 'roleModel',
            key: 'role_id'
        },
        defaultValue: 2,
    },
    pseudo : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    location : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    avatar : {
        type : DataTypes.STRING,
        allowNull: true,
    },
    created_at : {
        field: 'created_at',
        type : DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        field: 'updated_at',
        type : DataTypes.DATE,
        allowNull: true,
    },
    description : {
        type : DataTypes.STRING(1000),
        allowNull: true,
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;