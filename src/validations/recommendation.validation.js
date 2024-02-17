const Joi = require('joi');
const { objectId } = require('./custom.validation');

// Recommendation


const createRecommendation = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : ({
        userId : Joi.required().custom(objectId),
        description : Joi.string().required(),
        Images : Joi.array().items(Joi.string()),
    })
};


const getRecommendation = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
        recommendationId : Joi.required().custom(objectId),
    }),
    body : ({
        userId : Joi.required().custom(objectId),
    })
}

const getRecommendations = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : ({
        userId : Joi.required().custom(objectId),
    }),
}

const updateRecommendation = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
        recommendationId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
        description : Joi.string(),
        Images : Joi.array().items(Joi.string()),
    })
    .min(2)
}

const deleteRecommendation = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
        recommendationId : Joi.required().custom(objectId),
    }),
    body : ({
        userId : Joi.required().custom(objectId),
    }),
}

module.exports = {
    createRecommendation,
    getRecommendation,
    getRecommendations,
    updateRecommendation,
    deleteRecommendation
}