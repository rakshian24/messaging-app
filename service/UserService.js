import UserRepository from '../repositories/UserRepository';
import Joi from 'joi';
import Validator from '../validators/Validator';
import { UserInputError, ForbiddenError } from 'apollo-server';

module.exports = class UserService {
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
  async registerUser(args, context) {
    const { error, value } = Joi.validate(args, Validator.registerUser, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details;
      throw new UserInputError('Validation Errors', { errors });
    }
    try {
      const { username, email, password, confirmPassword } = value;

      if (password !== confirmPassword) {
        throw new ForbiddenError('Passwords does not match!');
      }

      const registeredUser = await this.userRepo.registerUser(context, value);
      console.log("Registered User = ", JSON.stringify(registeredUser, undefined, 2))

      return registeredUser;

    } catch (error) {
      console.log('Etot = ', error);
      throw error;
    }
  }
};
