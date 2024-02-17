const httpStatus = require('http-status');
const { Item, Recommendations } = require('../models');
const ApiError = require('../utils/ApiError');

const getItem = async (itemId) => {
    return await Item.findById(itemId);
}

const getRecommendation = async (recommendationId) => {
    return await Recommendations.findById(recommendationId);
}
const createRecommendation = async (itemId, createBody) => {
    const item = await getItem(itemId);
    if(!item) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Item Found")
    }
    createBody.itemId = itemId;
    const newRecommendation = await Recommendations.create(createBody);
    const updatedItem = await Item.findOneAndUpdate({'_id':itemId}, {'$push': {'recommendations' : newRecommendation._id}} , {new:true});
    updatedItem.recommendationsCount =  updatedItem.recommendationsCount + 1;
    updatedItem.save();
    return updatedItem;
};

const updateRecommendation = async (itemId, recommendationId, updateBody) => {
    const item = await getItem(itemId);
    if(!item) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Item Found")
    }

    const recommendation = await getRecommendation(recommendationId);
    console.log("recommendation", recommendationId)
    if(!recommendation) {
        throw new ApiError(httpStatus.NOT_FOUND, "Recommendation Not Found")
    }
    Object.assign(recommendation, updateBody);
    recommendation.save();
    return recommendation;
};


const deleteRecommendation = async (itemId, recommendationId) => {
    const item = await getItem(itemId);
    if(!item) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Item Found")
    }
    const recommendation = await getRecommendation(recommendationId);
    if(!recommendation) {
        throw new ApiError(httpStatus.NOT_FOUND, "Recommendation Not Found")
    }
    const updateItem = Item.findOneAndUpdate({'_id':itemId}, {$pop : {'recommendations' : recommendation._id}}, {new:true});
    updateItem.recommendationsCount -= 1;
    (await updateItem).save();
    recommendation.remove();
    return recommendation;
};


const getRecommendations = async(itemId) => {
    const item = await getItem(itemId);
    if(!item) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Item Found")
    }
    return await Recommendations.find({"itemId":itemId});
}

module.exports = {
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
    getRecommendations
}