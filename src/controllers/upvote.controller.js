const catchAsync = require('../utils/catchAsync');
const { upvoteService } = require('../services');



const upvote = catchAsync(async (req,res) => {
    const updatedItem = await upvoteService.upvote(req.params.itemId, req.body.userId);
    res.send(updatedItem);
});


const downvote = catchAsync(async (req,res) => {
    console.log("downvote")
    const updatedItem = await upvoteService.downvote(req.params.itemId, req.body.userId);
    res.send(updatedItem);
});


module.exports = {
    upvote,
    downvote
}