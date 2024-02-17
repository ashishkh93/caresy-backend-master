const httpStatus = require('http-status');
const { Item, Upvote } = require('../models');
const ApiError = require('../utils/ApiError');

const getItem = async (itemId) => {
    return await Item.findById(itemId);
}

const getUpvote = async(itemId, userId) => {
    const item = await getItem(itemId);
    if(!item) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No item Found')
    }
    const upvoted = Upvote.findOne({"userId":userId, "itemId":itemId});
    if(!upvoted) return undefined;
    return upvoted;
};

const createUpvote = async (itemId, userId, rating) => {
    const objUpvote = {
        "itemId" : itemId,
        "userId" : userId,
        "rating" : rating,
    }
    const upvote = await Upvote.create(objUpvote);
    return upvote;
};


const upvote = async (itemId, userId) => {
    const upvoted = await getUpvote(itemId, userId, 1);
    console.log("upvoted" , upvoted)
    if(!upvoted) {
        const upvote = await createUpvote(itemId, userId);
        const item = await Item.findOneAndUpdate({"_id" : itemId}, {$push: {"upvote" : upvote._id }},{new:true});
        item.votesCount = item.votesCount + 1;
        item.save();
        return item;
    }
    return await Item.findById(itemId);
};



const downvote = async (itemId, userId) => {
    const upvoted = await getUpvote(itemId, userId);
    console.log(upvoted)
    if(upvoted) {
        const item = await Item.findOneAndUpdate({"_id":itemId},{$pull:{"upvote" : upvoted._id }},{new:true});
        item.votesCount = item.votesCount - 1;
        await item.save();
        console.log(item);
        upvoted.remove();
        return item;
    }
    return await Item.findById(itemId);
};


module.exports = {
    upvote,
    downvote
}