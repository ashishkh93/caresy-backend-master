const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createGrowth = {
    params : Joi.object().keys({
        babyId : Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        headCircumference : Joi.number(),
        date: Joi.date().required(),
        height: Joi.number(),
        weight: Joi.number(),
        userId : Joi.string().custom(objectId),
    }),
};

const getGrowth = {
    params : Joi.object().keys({
        babyId : Joi.string().custom(objectId),
        growthId : Joi.string().custom(objectId),
        userId : Joi.string().custom(objectId),
    })
};

const getGrowths = {
    params : Joi.object().keys({
        babyId : Joi.string().custom(objectId),
    }),
    query : Joi.object().keys({
        day : Joi.number(),
        userId : Joi.string().custom(objectId),
    })
};

const updateGrowth = {
    params: Joi.object().keys({
        babyId : Joi.string().custom(objectId),
        growthId : Joi.string().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        headCircumference : Joi.number(),
        date: Joi.date(),
        height: Joi.number(),
        weight: Joi.number(),
        userId : Joi.string().custom(objectId),
      })
      .min(1),
};


const deleteGrowth = {
  params: Joi.object().keys({
    babyId : Joi.string().custom(objectId),
    growthId : Joi.string().custom(objectId),
  }),
  body: Joi.object()
  .keys({
    userId : Joi.string().custom(objectId),
  })
};



module.exports = {
    createGrowth,
    getGrowth,
    getGrowths,
    updateGrowth,
    deleteGrowth,
}