const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const itemService = require('../services/item.service')

const createItem = catchAsync(async (req,res)=>{
    const item = await itemService.createItem(req.body);
    res.status(httpStatus.CREATED).send(item);
});

const getItem = catchAsync(async(req,res) => {
    const item = await itemService.getItem(req.params.itemId);
    res.send(item);
})

const updateItem = catchAsync(async (req,res)=>{
    console.log("heloos")
    const item = await itemService.updateItem(req.params.itemId, req.body);
    return res.send(item);
});

const deleteItem = catchAsync(async (req,res) => {
    await itemService.deleteItem(req.params.itemId);
    res.status(httpStatus.NO_CONTENT).send();
});


const listItems = catchAsync(async (req,res) => {
    const items =  await itemService.listItems();
    res.send(items);
})

const topItems = catchAsync(async (req,res) => {
    const items =  await itemService.getPopularItems();
    res.send(items);
})

const recommendedItems = catchAsync(async(req,res)=>{
    const items =  await itemService.getRecommendedItems();
    res.send(items);
})

const createURL = catchAsync(async (req,res)=>{
    const item = await itemService.createURL(req.params.itemId, req.body);
    res.status(httpStatus.CREATED).send(item);
});


const updateURL = catchAsync(async (req,res)=>{
    const item = await itemService.updateURL(req.params.itemId, req.params.siteId, req.body);
    res.send(item);
});

const deleteURL = catchAsync(async (req,res)=>{
    const item = await itemService.deleteURL(req.params.itemId, req.params.siteId);
    res.send(item);  
});

const getURLS = catchAsync(async (req,res)=>{
    const urls = await itemService.getURLS(req.params.itemId);
    res.send(urls);
});

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    listItems,
    topItems,
    recommendedItems,
    getItem,
    createURL,
    updateURL,
    deleteURL,
    getURLS
}