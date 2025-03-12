"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class School extends Model {
        static associate(models) {}
    }
    School.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            latitude: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            longitude: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "School",
        },
    );
    return School;
};
