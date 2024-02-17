const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, formService } = require('../services');

const fillForm = catchAsync(async (req, res) => {
  const form = await formService.fillForm(req.body);
  res.status(httpStatus.CREATED).send(form);
});

const displayDetails = catchAsync(async (req,res) => {
  const details = await formService.displayDetails();
  res.status(httpStatus.CREATED).send(details);
})

// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

module.exports = {
  fillForm,
  displayDetails,
};
