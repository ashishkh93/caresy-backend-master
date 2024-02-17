const Joi = require('joi');


const registerActivity = {
    params : Joi.object().keys({
      babyId : Joi.string().required(),
    }),
      body: Joi.object().keys({
        date : Joi.date().required(),
        babyId : Joi.string().required(),
        activityType: Joi.string().required(),
        start: Joi.string().required(),
        end: Joi.string().required(),
        duration: Joi.string().required(),
        notes : Joi.string().required(),
        method : Joi.string(),
        amount : Joi.string(),
        wet : Joi.boolean(),
        solid : Joi.boolean(),
        color : Joi.string(),
      }),
};

const getActivity = {
    params : Joi.object().keys({
        babyId : Joi.string().required(),
    }),
    body : Joi.object().keys({
      date : Joi.date().required(),
    })
}

const deleteActivity = {
    params: Joi.object().keys({
      babyId: Joi.string().required(),
    }),
};
  
  
const updateActivity = {
    params: Joi.object().keys({
      babyId: Joi.string().required(),
    }),
    body: Joi.object()
      .keys({
        babyId : Joi.string().required(),
        activityType: Joi.string(),
        start: Joi.string(),
        end: Joi.string(),
        duration: Joi.string(),
        notes : Joi.string(),
        method : Joi.string(),
        amount : Joi.string(),
        wet : Joi.boolean(),
        solid : Joi.boolean(),
        color : Joi.string(),
      })
      .min(1),
};

module.exports = {
    registerActivity,
    getActivity,
    deleteActivity,
    updateActivity,
}