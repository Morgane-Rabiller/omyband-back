
const sequelize =require( "sequelize");
const db = require("../db/db.js");

const { DataTypes } = sequelize;

const Announcement = db.define("announcements", {
    announcement_id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'userModel',
            key:'user_id'
        },
    },
    user_type : {
        type: DataTypes.INTEGER,
        references: {
            model: 'typeModel',
            key:'type_id'
        },
    },
    research_type : {
        type: DataTypes.INTEGER,
        references: {
            model: 'typeModel',
            key:'type_id'
        },
    },
    title : {
        type: DataTypes.STRING,
        allowNull :false,
    },
    description : {
        type : DataTypes.STRING(1000),
        allowNull: false,
    }
},{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Announcement;
