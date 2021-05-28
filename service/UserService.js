import UserRepository from '../repositories/UserRepository';
import Joi from 'joi';
import Validator from '../validators/Validator';
import { UserInputError } from 'apollo-server';

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

      const response = await this.userRepo.findAll(
        context,
        paginationObj,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
};
