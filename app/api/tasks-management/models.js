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
    },
    git_branch_name: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    card_no: {
        type: DataTypes.STRING,
        defaultValue: 'BT-1'
    }, 
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    card_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
},  {
      freezeTableName: true,
      underscored: true,
      ...(isParanoid && { paranoid: true }),
    },
);

Tasks.beforeCreate(async (task) => {
    if (!task.cardNo) {
        const lastTask = await Tasks.findOne({ 
            order: [['createdAt', 'DESC']]
        });
        const lastNumber = lastTask 
            ? parseInt(lastTask.card_no.split('-')[1]) || 0 
            : 0;
        task.cardNo = `BT-${lastNumber + 1}`;
    }
});

module.exports = {
    Tasks
}