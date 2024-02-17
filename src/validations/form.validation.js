const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const fillForm = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    message: Joi.string(),
    name: Joi.string().required(),
    type: Joi.string().required().valid('signup', 'message'),
  }),
};

module.exports = {
  fillForm,
};
