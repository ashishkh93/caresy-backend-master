const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTransaction = {
    // params : Joi.object().keys({
    //     userId : Joi.string().custom(objectId);
    // }),
    body : Joi.object().keys({
       userId : Joi.string().custom(objectId),
       amount : Joi.number().required(),
       reference : Joi.string(),
       note : Joi.string(),
    })
};


module.exports = {
    createTransaction,
}