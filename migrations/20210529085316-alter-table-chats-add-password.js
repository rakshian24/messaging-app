'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('users', 'password', {
              type: Sequelize.STRING,
              after: 'email',
              allowNull: false,
            }, { transaction: t })
        ])
    })
},

down: (queryInterface) => {
  return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('users', 'password', { transaction: t })
      ])
  })
}
};

