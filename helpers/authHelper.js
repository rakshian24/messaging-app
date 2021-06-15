import { AuthenticationError } from 'apollo-server-errors';
import { skip } from 'graphql-resolvers';
import { sign, verify } from 'jsonwebtoken';
import { isEmpty } from 'lodash';

export const verifyToken = async (models, header) => {
  let user = {};
  try {
    const { User = {} } = models;
    const token = header.authorization
      ? header.authorization.replace('Bearer ', '')
      : '';

    if (token) {
      const decodedTokenObj = verify(token, process.env.ACCESS_TOKEN_SECRET);

      const decodedUserId = decodedTokenObj.userId;

      user = await User.findOne({
        where: { id: decodedUserId },
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
  return !isEmpty(user)
    ? skip
    : new AuthenticationError('Unauthenticated User!');
};

export const sendRefreshToken = (res, token) => {
  res.cookie('refresh_token', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

export const createAccessToken = user => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = user => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    },
  );
};
