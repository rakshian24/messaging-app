import Joi from 'joi';

export default {
  /**
   * user validation
   */
  user: Joi.object().keys({
    username: Joi.string(),
    email: Joi.string(),
    limit: Joi.number(),
    offset: Joi.number(),
  }),

  /**
   * Register user validation
   */
   signUp: Joi.object().keys({
    username: Joi.string().trim().min(3).max(20).required(),
    email: Joi.string().trim().max(100).required(),
    password: Joi.string().trim().min(6).required(),
    confirmPassword: Joi.string().trim().min(6).required(),
  }),

  /**
   * Login user validation
   */
   loginUser: Joi.object().keys({
    email: Joi.string().trim().max(100).required(),
    password: Joi.string().trim().min(6).required(),
  }),
};
