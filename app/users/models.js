const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const isParanoid = true;

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},  {
        freezeTableName: true,
        underscored: true,
        ...(isParanoid && { paranoid: true }),
    },
);

module.exports = {
    Users
}