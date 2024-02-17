
const httpStatus = require('http-status')
const { Item, User } = require('../models');
const ApiError = require('../utils/ApiError');



const searchProductByName = async (userId, name) => {
    const user = User.findById(userId);
    if(!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User is not Found');
    }
    const items = await Item.fuzzySearch(name);
    console.log(items)
    return items;
}


module.exports = {
    searchProductByName
}