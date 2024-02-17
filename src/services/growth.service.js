const httpStatus = require('http-status');
const { Baby, Growth } = require('../models');
const ApiError = require('../utils/ApiError');



const getBabyById = async (id) => {
    return Baby.findById(id);
}

const getGrowthById = async (id) => {
    return Growth.findById(id);
}

/**
 * Create a growth
 * @param {ObjectId} babyId
 * @param {Object} growthBody
 * @returns {Promise<growth>}
 */
const createGrowth = async (babyId, growthBody) => {
    const baby = await getBabyById(babyId);
    if(!baby) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Baby not found');
    }
    growthBody.babyId = babyId;
    const growth = await Growth.create(growthBody);
    return growth;
};


/**
 * Get a growth By growthId
 * @param {ObjectId} growthId
 * @returns {Promise<growth>}
 */
const getGrowth = async (growthId) => {
    const growth = await getGrowthById(growthId);
    if(!growth) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No Growth Found with baby.');
    }
    return growth;
}


/**
 * Get all growth associated with babyId
 * @param {ObjectId} babyId
 * @query {query} RequstURLQuery
 * @returns [{Promise<growth>}]
 */
const getGrowths = async (babyId, query) => {
    const baby = await getBabyById(babyId);
    if(!baby) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Baby not found');
    }
    const day = (query.day != undefined) ? query.day : 5;
    const all_growths = await Growth.find(
        {
            babyId : babyId,    
            "date": 
                {
                    $gte : new Date((new Date().getTime() - (day * 24 * 60 * 60 * 1000)))
                }
        }
    ).sort({ "date": -1});

   console.log(all_growths);
   return all_growths;
};


/**
 * Update a growth by growthId
 * @param {ObjectId} babyId
 * @param {ObjectId} growthId
 * @param {Object} updateBody
 * @returns {Promise<growth>}
 */

const updateGrowthById = async (babyId, growthId, updateBody) => {
    const growth = await getGrowthById(growthId);
    if (!growth) {
        return createGrowth(babyId,updateBody);
    }
    Object.assign(growth, updateBody);
    await growth.save();
    return growth;
};


/**
 * Delete a growth By growthId
 * @param {ObjectId} growthId
 * @returns {Promise<growth>}
 */
const deleteGrowthById = async(growthId) => {
    const growth = await getGrowthById(growthId);
    if (!growth) {
        return createGrowth(babyId,updateBody);
    }
    await growth.remove();
    return growth;
}


module.exports = {
    createGrowth,
    getGrowth,
    getGrowths,
    updateGrowthById,
    deleteGrowthById
}