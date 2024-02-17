const Joi = require('joi');


const referral = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    referralCode: Joi.string().required(),
  }),
};

module.exports = {
    referral
  };
  