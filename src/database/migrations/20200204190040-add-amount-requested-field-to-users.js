module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'amount_requested', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'amount_requested');
  },
};
