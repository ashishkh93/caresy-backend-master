
const mongoose = require('mongoose');

const UpvoteSchema = mongoose.Schema(
    {
        userId : {
            type : mongoose.Types.ObjectId,
            ref : 'User',
            required : true
        },
        itemId : {
            type : mongoose.Types.ObjectId,
            ref : 'Item',
            required : true
        },
        rating : {
            type: Number,
            default : 1,
        },
    },
    {
        timestamps : true
    }
);

UpvoteSchema.index({ userId: 1, itemId: 1 }, { unique: true });

/**
 * @typedef Item
 */
const Upvote = mongoose.model('Upvote', UpvoteSchema);

module.exports = Upvote;
