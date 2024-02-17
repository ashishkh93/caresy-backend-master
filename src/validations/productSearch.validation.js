
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const searchProduct =  {
    body : Joi.object().keys({
        userId : Joi.string().custom(objectId),
        text : Joi.string().required(), 
    })
}


module.exports = {
    searchProduct
}