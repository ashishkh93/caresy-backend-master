const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { growthService } = require('../services');

const createGrowth = catchAsync(async (req,res) => {
    console.log(req.body);
    const growth = await growthService.createGrowth(req.params.babyId, req.body);
    res.status(httpStatus.CREATED).send(growth);
});

const getGrowth = catchAsync( async(req,res) => {
    const growth = await growthService.getGrowth(req.params.growthId);
    res.send(growth);
});

const getGrowths = catchAsync(async (req,res) => {
    const growths = await growthService.getGrowths(req.params.babyId, req.query);
    res.send(growths);
});

const updateGrowth = catchAsync(async (req,res) => {
    const growth = await growthService.updateGrowthById(req.params.babyId,req.params.growthId,req.body);
    res.send(growth);
});

const deleteGrowth = catchAsync(async (req,res) => {
    await growthService.deleteGrowthById(req.params.growthId);
    res.status(httpStatus.NO_CONTENT).send();
})

module.exports = {
    createGrowth,
    getGrowth,
    getGrowths,
    updateGrowth,
    deleteGrowth,
}