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
  registerUser: Joi.object().keys({
    username: Joi.string().max(20).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
  }),
};
