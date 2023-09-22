import sequelize from "sequelize";
import db from "../db/db.js"

const { DataTypes } = sequelize;

const Instrument = db.define("instruments", {
    instrument_id : {
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

export default Instrument;