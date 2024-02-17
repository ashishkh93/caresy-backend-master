const httpStatus = require('http-status');
const Activity = require('../models/activity.model');
const catchAsync = require('../utils/catchAsync');
const { activityServices } = require('../services');



const registerActivity = catchAsync(async (req, res) => {
    const babyId = req.params.babyId;
    const activity = await activityServices.registerActivity( babyId ,req.body ) ;
    res.status(httpStatus.CREATED).send({ activity });
});

const getActivity = catchAsync(async (req, res) => {
    const date = req.body.date ;
    const babyId = req.params.babyId;
    const activity = await activityServices.getActivityByBabyId(babyId , date);
    res.send(activity);
});

const deleteActivity = catchAsync(async (req, res) => {
    const babyId = req.params.babyId;
    await activityServices.deleteActivityByBabyId(babyId);
    res.status(httpStatus.NO_CONTENT).send();
});

const updateActivity = catchAsync(async (req, res) => {
    const babyId = req.params.babyId;
    const activity = await activityServices.updateActivityByBabyId(babyId, req.body);
    res.send(activity);
  });

module.exports = {
    registerActivity,
    getActivity,
    deleteActivity,
    updateActivity,
}