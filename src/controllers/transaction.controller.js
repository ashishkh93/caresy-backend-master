
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { transactionService } = require('../services');


const deposit = catchAsync(async (req,res) => {
    const transaction = await transactionService.createTransaction(req.body.userId, req.body, 'Deposit')
    res.status(httpStatus.CREATED).send(transaction);
});

const withdraw = catchAsync(async (req,res) => {
    const transaction = await transactionService.createTransaction(req.body.userId, req.body, 'Withdraw')
    res.status(httpStatus.CREATED).send(transaction);
});

module.exports = {
    deposit,
    withdraw,
}