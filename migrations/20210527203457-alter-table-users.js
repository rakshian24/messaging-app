'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'users',
          'createdAt',
          {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          },
          { transaction: t },
        ),
        queryInterface.changeColumn(
          'users',
          'updatedAt',
          {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
