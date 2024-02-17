const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { babyServices } = require('../services')

const registerBaby = catchAsync(async (req, res) => {
    const userId =  req.params.userId;
    const baby = await babyServices.registerBaby( userId , req.body);
    res.status(httpStatus.CREATED).send({ baby });
});

const getBaby = catchAsync(async (req, res) => {
    const babyId = req.params.id;
    const baby = await babyServices.getBaby(babyId);
    res.send(baby);
});

const deleteBaby = catchAsync(async (req, res) => {
    const babyId = req.params.id;
    await babyServices.deleteBabyById(babyId);
    res.status(httpStatus.NO_CONTENT).send();
});

const updateBaby = catchAsync(async (req, res) => {
    const babyId = req.params.id;
    const baby = await babyServices.updateBabyById(babyId, req.body);
    res.send(baby);
  });

module.exports = {
    registerBaby,
    getBaby,
    deleteBaby,
    updateBaby,
}