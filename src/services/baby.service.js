const httpStatus = require('http-status');
const { Baby , User } = require('../models');
const ApiError = require('../utils/ApiError');


const registerBaby = async ( userId , babyBody) =>{
    const baby = await Baby.create(babyBody);
    await User.findByIdAndUpdate(
        { _id: userId },
        {$push: { babies : baby._id }}
    );
    return baby;
}

const updateBabyById = async (BabyId , updateBody) => {
    const baby = await getBabyById(BabyId);
    Object.assign(baby, updateBody);
    await baby.save();
    return baby;
}

const deleteBabyById = async (babyId) => {
    const baby = await getBabyById(BabyId);
    if (!baby) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Baby not found');
    }
    User.findOneAndUpdate({babies :{_id : babyId}},
        {
            $pull: {
                babies: { _id: babyId }
            }
        }
       );
    await baby.remove();
    return baby;
};

const getBabyById = async (BabyId) => {
    const baby = await Baby.findOne({ id : BabyId }).exec();
    if (!baby) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Baby not found');
    }
    return baby;
}

const getUserById = async (userId) => {
    const user = await User.findOne({ id : userId }).exec();
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return user;
}

module.exports = {
    registerBaby,
    deleteBabyById,
    getBabyById,
    updateBabyById,
    getUserById,
}