import jwt from 'jsonwebtoken';
import { JWT_SECRET_TOKEN } from '../config/env.json';
import { AuthenticationError } from 'apollo-server-errors';
import { skip } from 'graphql-resolvers';

export const verifyToken = async (models, header) => {
  let user = {};
  try {
    const { User = {} } = models;
    const token = header.authorization
      ? header.authorization.replace('Bearer ', '')
      : '';
    if (token) {
      const decodedTokenObj = jwt.verify(token, JWT_SECRET_TOKEN);
      const decodedUserName = decodedTokenObj.username;
      user = await User.findOne({
        where: { username: decodedUserName },
      });
      return user;
    } else {
      return user;
    }
  } catch (error) {
    console.log('ERRROR = ', error);
  }
};

export const isAuthenticated = async (parent, args, { user }) => {
  return user ? skip : new AuthenticationError('Unauthenticated User!');
};
