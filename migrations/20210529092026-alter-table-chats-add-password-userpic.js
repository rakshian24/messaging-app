'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.addColumn('users', 'userPicUrl', {
              type: Sequelize.STRING,
              after: 'password',
            }, { transaction: t })
        ])
    })
},

down: (queryInterface) => {
  return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('users', 'userPicUrl', { transaction: t }),
      ])
  })
}
};

