const Joi = require('joi');
const { objectId } = require('./custom.validation');

// upvote

const upvote = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
        rating : Joi.number(),
    })
};


const downvote = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
        // voteId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
        rating : Joi.number(),
    })
};

module.exports = {
    upvote,
    downvote,
}