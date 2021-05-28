const UserService = require('../../service/UserService');

exports.resolver = {
  Query: {
    getUsers: async (root, args, context) => {
      const userService = new UserService();
      const users = await userService.getUsers(args, context);
      return users;
    },
  },
};
