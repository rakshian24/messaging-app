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
    signUp: async (root, args, context) => {
      const userService = new UserService();
      const user = await userService.signUp(args, context);
      return user;
    },
    login: async (root, args, context) => {
      const userService = new UserService();
      const user = await userService.login(args, context);
      return user;
    },
  },
};
