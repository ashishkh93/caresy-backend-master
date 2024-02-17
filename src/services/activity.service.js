const httpStatus = require('http-status');
const { Baby ,  Activity } = require('../models');
const ApiError = require('../utils/ApiError');



const registerActivity = async ( babyId , activityBody) =>{
    const activity = await Activity.create(activityBody);
    return activity;
}

const updateActivityByBabyId = async (BabyId , updateBody) => {
    const activity = await getActivityByBabyId(BabyId);
    Object.assign(activity, updateBody);
    await activity.save();
    return activity;
}

const deleteActivityByBabyId = async (babyId) => {
    const activity = await getActivityByBabyId(babyId);
    if (!activity) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
    }
    await activity.remove();
    return activity;
};

const getActivityByBabyId = async (babyId , date) => {
    const activity = await Activity.find({ babyId : babyId , date : date}).sort({ "date" : -1 }).exec();
    if (!activity) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
    }
    return activity;
}


module.exports = {
    registerActivity,
    deleteActivityByBabyId,
    getActivityByBabyId,
    updateActivityByBabyId,
}