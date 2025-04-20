module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tasks', 'status', {
      type: Sequelize.ENUM('to-do', 'in-progress', 'completed', 'qa'),
      defaultValue: 'to-do'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tasks', 'status', {
      type: Sequelize.ENUM('to-do', 'in-progress', 'completed'),
      defaultValue: 'to-do'
    });
  }
};