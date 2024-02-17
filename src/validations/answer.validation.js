const Joi = require('joi');

const getAllAnswer = {
    params : Joi.object().keys({
        userId : Joi.string().required(),
        questionId : Joi.string().required(),
    }),
}

const deleteAnswer = {
    params: Joi.object().keys({
      userId: Joi.string().required(),
      questionId: Joi.string().required(),
    }),
};

const postAnswer = {
    params : Joi.object().keys({
      userId : Joi.string().required(),
      questionId : Joi.string().required(),
    }),
      body: Joi.object().keys({
        date : Joi.date().required(),
        answer : Joi.string().required(),
      }),
};

module.exports = {
    getAllAnswer,
    deleteAnswer,
    postAnswer,
}