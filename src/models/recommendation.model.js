
const mongoose = require('mongoose');

const RecommendationSchema = mongoose.Schema(
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
        description : {
            type: String,
            default : 1,
        },
        Images : [{
            type : String,
        }]
    },
    {
        timestamps : true
    }
);

RecommendationSchema.index({ userId: 1, itemId: 1 }, { unique: true });

/**
 * @typedef Item
 */
const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

module.exports = Recommendation;
