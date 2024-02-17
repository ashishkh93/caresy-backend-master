
const moongose = require('mongoose');

const WalletSchema = moongose.Schema(
    {
        userId : {
            type : moongose.SchemaTypes.ObjectId,
            ref : 'User',
            required : true,
        },
        balance : {
            type : Number,
            min : 0,
            default : 0,
        },
    },
    {
        timestamps: true,
    }
)

const Wallet = moongose.model('Wallet', WalletSchema);

module.exports = Wallet;