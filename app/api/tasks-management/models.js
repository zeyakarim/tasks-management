const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const isParanoid = true;

const Tasks = sequelize.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['to-do','in-progress','completed'],
        defaultValue: 'to-do',
    }
},  {
      freezeTableName: true,
      underscored: true,
      ...(isParanoid && { paranoid: true }),
    },
);

module.exports = {
    Tasks
}