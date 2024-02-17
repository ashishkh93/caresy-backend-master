
const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const ItemSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        description : {
            type : String,
        },  
        Images : [{
            type : String,
        }],
        votesCount : {
            type : Number,
            default : 0
        },
        recommendationsCount : {
            type : Number,
            default : 0 
        },
        recommendations : [{
            type : mongoose.SchemaTypes.ObjectId,
            ref : 'Recommendation'
        }],
        upvote : [{
            type : mongoose.SchemaTypes.ObjectId,
            ref : 'Upvote'
        }],
        purchaseSites : [
        {
            site : {
                type : String,
                enum: ['Amazon', 'Filpkart', 'FirstCry', 'Others'],
                required : true, 
            },
            price : {
                type : Number,
                required : true,
                min : 0,
            },
        }
    ],
    },
    {
        timestamps : true
    }
)

ItemSchema.plugin(mongoose_fuzzy_searching, { fields: ['name']});
/**
 * @typedef Item
 */
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
