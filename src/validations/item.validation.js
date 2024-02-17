const Joi = require('joi');
const { objectId } = require('./custom.validation');


const createItem = {
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
        name : Joi.string().required(),
        description : Joi.string().required(),
        Images : Joi.array().items(Joi.string().required()),
        purchaseSites : Joi.array().items({
            sites : Joi.string().required(),
            price : Joi.number().required(),
        })
    })
};

const getItem = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : ({
        userId : Joi.required().custom(objectId),
    })
}

const getItems = {
    body : ({
        userId : Joi.required().custom(objectId),
    }),
}

const updateItem = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
        name : Joi.string(),
        description : Joi.string(),
        Images : Joi.array().items(Joi.string()),
    })
    .min(1)
}

const deleteItem = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
    }),
}


const createURL = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
        site : Joi.string().required().valid('Amazon', 'Filpkart', 'FirstCry', 'Others'),
        price : Joi.number().required()
    })
};  


const updateURL = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
        siteId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
        site : Joi.string().required().valid('Amazon', 'Filpkart', 'FirstCry', 'Others'),
        price : Joi.number().required()
    })
    .min(1)
};


const deleteURL = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
        siteId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
    }) 
}

const getURLS = {
    params : Joi.object().keys({
        itemId : Joi.required().custom(objectId),
    }),
    body : Joi.object().keys({
        userId : Joi.required().custom(objectId),
    }), 
}


module.exports = {
    createItem,
    getItem,
    getItems,
    updateItem,
    deleteItem,
    createURL,
    updateURL,
    deleteURL,
    getURLS
}




