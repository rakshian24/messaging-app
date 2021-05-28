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
};
