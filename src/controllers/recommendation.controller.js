const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { recommendationService } = require('../services');



const createRecommendation = catchAsync(async (req,res) => {
    const item = await recommendationService.createRecommendation(req.params.itemId, req.body);
    return res.status(httpStatus.CREATED).send(item);
});


const updateRecommendation = catchAsync(async (req,res) => {
    const recommendation = await recommendationService.updateRecommendation(req.params.itemId, req.params.recommendationId, req.body);
    res.send(recommendation);
});

const deleteRecommendation = catchAsync(async (req,res) => {
    const recommendation = await recommendationService.deleteRecommendation(req.params.itemId, req.params.recommendtionId);
    res.status(httpStatus.NO_CONTENT).send();
});

const getRecommendations = catchAsync(async (req,res) => {
    const recommendations =  await recommendationService.getRecommendations(req.params.itemId);
    res.send(recommendations);
});




module.exports = {
    createRecommendation,
    updateRecommendation,
    deleteRecommendation,
    getRecommendations,
}

