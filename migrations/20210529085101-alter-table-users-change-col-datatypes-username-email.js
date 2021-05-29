'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'users',
          'username',
          {
            type: Sequelize.STRING(20),
            allowNull: false,
          },
          { transaction: t },
        ),
        queryInterface.changeColumn(
          'users',
          'email',
          {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          { transaction: t },
        ),
      ]);
    });
  },

  down: (queryInterface) => {
    return true;
  },
};
