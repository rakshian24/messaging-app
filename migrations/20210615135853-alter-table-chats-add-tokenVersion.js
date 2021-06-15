'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('users', 'tokenVersion', {
              type: Sequelize.INTEGER,
              after: 'userPicUrl',
              defaultValue: 0,
            }, { transaction: t })
        ])
    })
},

down: (queryInterface) => {
  return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('users', 'tokenVersion', { transaction: t })
      ])
  })
}
};

