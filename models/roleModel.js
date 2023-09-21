import { sequelize } from "sequelize";

const { DataTypes } = sequelize;

const Role = db.define("role", {
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