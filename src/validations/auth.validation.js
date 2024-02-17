const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    profile: Joi.object().keys({
      name : Joi.string().required(),
      avatar : Joi.string(),
    }),
  }),
};

const googleAuth = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    authType: Joi.string().required(),
    avatar: Joi.string(),
    phone: Joi.string().allow(''),
  })
}

const truecallerAuth = {
  body: Joi.object().keys({
    email : Joi.string().email().allow(''),
    phone : Joi.string().alphanum().max(10).min(10),
    authType: Joi.string().required(),
    avatar: Joi.string(),
  })
}

const phoneRegister = {
  body: Joi.object().keys({
    phone : Joi.string().alphanum().max(10).min(10),
    authType: Joi.string().required(),
  })
}

const phoneVerify = {
  body: Joi.object().keys({
    phone : Joi.string().alphanum().max(10).min(10),
    otp: Joi.number(),
  })
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  register,
  googleAuth,
  truecallerAuth,
  login,
  phoneRegister,
  phoneVerify,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
