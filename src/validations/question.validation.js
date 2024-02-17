const Joi = require('joi');

const getAllQuestion = {
    params : Joi.object().keys({
        userId : Joi.string().required(),
    }),
}

const deleteQuestion = {
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
    body: Joi.object().keys({
      date : Joi.date(),
      quesId : Joi.string().required(),
    }),
};

const postQuestion = {
    params : Joi.object().keys({
      userId : Joi.string().required(),
    }),
      body: Joi.object().keys({
        date : Joi.date().required(),
        question : Joi.string().required(),
      }),
};


const getQuestion = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
    quesId: Joi.string().required(),
  }),
}

const postAnswer = {
  params : Joi.object().keys({
    userId : Joi.string().required(),
    quesId : Joi.string().required(),
  }),
    body: Joi.object().keys({
      date : Joi.date().required(),
      answer : Joi.string().required(),
    }),
};

const deleteAnswer = {
  params : Joi.object().keys({
    userId : Joi.string().required(),
    quesId : Joi.string().required(),
  }),
  body: Joi.object().keys({
    date : Joi.date(),
    answerId : Joi.string().required(),
  }),
};

module.exports = {
    getAllQuestion,
    deleteQuestion,
    postQuestion,
    getQuestion,
    postAnswer,
    deleteAnswer,
}