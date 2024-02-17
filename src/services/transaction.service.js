const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { User, Transaction, Wallet } = require('../models');
const { getUserById } = require('./user.service');
const {createWallet, updateUserWallet} = require('./wallet.service');


const createTransaction = async (userId, transactionBody, opreation) =>  {

    const user = await getUserById(userId);
    if(!user) {
        throw ApiError(httpStatus.NOT_FOUND, "User is not Found");
    }

    // update transactionBody
    transactionBody.userId = userId;
    transactionBody.opreation = opreation;
    console.log(Date.now);
    console.log(Date.now());
    transactionBody.paymentDate = Date.now();

    console.log(transactionBody);
    const transaction = await Transaction.create(transactionBody);

    // update the user transaction list
    // await User.findByIdAndUpdate(userId , 
    //     {
    //         transactions : {$push : transaction._id}
    //     }
    // );

    // update into user wallet
    if(!user.wallet) {await createWallet(userId, 0);}
    console.log(transaction);
    // console.log(user.wallet);
    const user_wallet  = await Wallet.findById(user.wallet);
    console.log(user_wallet);
    const updated_user_wallet = await updateUserWallet(userId, transaction.amount, opreation);
    console.log(updated_user_wallet);
    return transaction;
}


module.exports = {
    createTransaction,
}
