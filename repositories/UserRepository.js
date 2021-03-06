const { getObjectKeysSum } = require('../common/functions');

module.exports = class UserRepository {
  /**
   * find all users
   * @param {*} context
   * @param {*} paginationObj
   */
  async findAll(context, paginationObj) {
    try {
      const { models: { User } = {} } = context;

      const users = await User.findAll({
        ...paginationObj,
        order: [['id', 'ASC']],
      });

      const usersCount = await User.count();

      const hasMore = usersCount > getObjectKeysSum(paginationObj);
      const response = {
        has_more: hasMore,
        users_count: usersCount,
        users,
      };
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * create a user
   * @param {*} context
   * @param {*} value
   */
  async signUp(context, value) {
    try {
      const { models: { User = {} } = {} } = context;

      const user = await User.create(value);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * find a user by email
   * @param {*} context
   * @param {*} email
   */
  async findUserByEmail(context, queryObj) {
    try {
      const { models: { User = {} } = {} } = context;

      const user = await User.findOne({
        where: { ...queryObj },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
};
