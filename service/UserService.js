import UserRepository from '../repositories/UserRepository';
import Joi from 'joi';
import Validator from '../validators/Validator';
import {
  UserInputError,
  ForbiddenError,
  AuthenticationError,
} from 'apollo-server';
import bcrypt from 'bcryptjs';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../helpers/authHelper';

export default class UserService {
  constructor() {
    this.userRepo = new UserRepository();
  }
  /**
   * get all users - pagination
   * @param {*} args
   * @param {*} context
   * @returns has_more, users, users_count
   */
  async getUsers(args, context) {
    const { error, value } = Joi.validate(args, Validator.user, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details;
      throw new UserInputError('Validation Errors', { errors });
    }
    try {
      const paginationObj = {};

      paginationObj.limit = value.limit ? value.limit : 10;
      paginationObj.offset = value.offset ? value.offset : 0;

      const response = await this.userRepo.findAll(context, paginationObj);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * register user
   * @param {*} args
   * @param {*} context
   * @returns user
   */
  async signUp(args, context) {
    const { error, value } = Joi.validate(args, Validator.signUp, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details;
      throw new UserInputError('Validation Errors', { errors });
    }
    try {
      const { password, confirmPassword } = value;

      if (password !== confirmPassword) {
        throw new ForbiddenError('Passwords does not match!');
      }

      const hashedPwd = await bcrypt.hash(password, 6);

      const registeredUser = await this.userRepo.signUp(context, {
        ...value,
        password: hashedPwd,
      });

      return {
        ...registeredUser.toJSON(),
        createdAt: registeredUser.createdAt.toISOString(),
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * login user
   * @param {*} args
   * @param {*} context
   * @returns user
   */
  async login(args, context) {
    const { error, value } = Joi.validate(args, Validator.login, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details;
      throw new UserInputError('Validation Errors', { errors });
    }
    try {
      const { email, password } = value;
      let queryObj = {};
      queryObj.email = email;
      const user = await this.userRepo.findUserByEmail(context, queryObj);
      const userResponse = {
        ...user.toJSON(),
        createdAt: user.createdAt.toISOString(),
      };

      if (!user) {
        throw new AuthenticationError('Email does not exist!');
      }

      const doesPasswordMatch = await bcrypt.compare(password, user.password);

      if (!doesPasswordMatch) {
        throw new AuthenticationError('Invalid Credentials!');
      }

      sendRefreshToken(context.response, createRefreshToken(user));

      return {
        user: userResponse,
        accessToken: createAccessToken(user),
      };
    } catch (error) {
      console.log('ERROR = ', error);
      throw error;
    }
  }
}
