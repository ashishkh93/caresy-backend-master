const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Wallet,User } = require('../models');

const createWallet = async (userId, amount) => {
    const walletObj = {userId:userId,balance:amount};
    const wallet =  await Wallet.create(walletObj);
    await User.findOneAndUpdate({_id:userId}, {wallet : wallet._id});
    return wallet;
}

const depositIntoWallet = async (userId, amount) => {
    const wallet = await Wallet.findOne({userId : userId}).exec();
    wallet.balance += amount;
    await wallet.save();
    return wallet;
};

const withdrawFromWallet = async (userId, amount) => {
    const wallet = await Wallet.findOne({userId : userId}).exec();
    if(wallet.balance < amount ) throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Balance is not sufficient");
    wallet.balance -= amount;
    await wallet.save();
    return wallet;
}

const updateUserWallet = async (userId, amount, opreation) => {
    if(opreation === 'Deposit') return await depositIntoWallet(userId,amount);
    else return await withdrawFromWallet(userId, amount);
}

const getWallet = async (userId) => {
    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not found")
    }
    if(!user.wallet) {
        return createWallet(userId, 20);
    }
    return user.wallet;
}


 module.exports = {
    createWallet,
    updateUserWallet,
    getWallet
 }