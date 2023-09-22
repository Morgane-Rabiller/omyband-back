
import sequelize from "sequelize";
import db from "../db/db.js"

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
    }
});

export default Announcement;
