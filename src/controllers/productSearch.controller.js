
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const  { searchProductByName } =  require('../services/productSearch.services');
const { model } = require('../models/user.model');


const searchProduct = catchAsync(async (req,res) => {
    console.log(req.body)
    const products = await searchProductByName(req.body.userId, req.body.text);
    res.send(products);
})


module.exports =  {
    searchProduct
}