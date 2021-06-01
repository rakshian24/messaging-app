import UserService from '../../service/UserService';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../../helpers/authHelper';

exports.resolver = {
  Query: {
    getUsers: combineResolvers(isAuthenticated, async (root, args, context) => {
      const userService = new UserService();
      const users = await userService.getUsers(args, context);
      return users;
    }),
  },
  Mutation: {
    registerUser: async (root, args, context) => {
      const userService = new UserService();
      const user = await userService.registerUser(args, context);
      return user;
    },
    loginUser: async (root, args, context) => {
      const userService = new UserService();
      const user = await userService.loginUser(args, context);
      return user;
    },
  },
};
