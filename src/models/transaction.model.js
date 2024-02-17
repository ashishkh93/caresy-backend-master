
const moongose = require('mongoose');


const operations = ['Deposit', 'Withdraw'];

const transactionSchema  = moongose.Schema(
    {
        userId : {
            type : moongose.SchemaTypes.ObjectId,
            ref : 'User',
            required: true,
        },
        opreation : {
            type : String,
            enum : operations,
            default : operations[0],
        },
        amount : {
            type : Number,
            default : 20,
            min : 20,
            max : 100,  
        },
        reference : {
            type : String,
        },
        note : {
            type : String,
        },
        paymentDate : {
            type : Date,
        },
    }, 
    {
        timestamp : true,
    }
);


const Transaction  = moongose.model('Transaction', transactionSchema);

module.exports = Transaction ;