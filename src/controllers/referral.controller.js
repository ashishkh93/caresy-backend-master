const httpStatus = require('http-status');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { refferalId } = require('../validations/referral.validation');



const getUser = catchAsync(async (req, res) => {
  const {referralCode} = req.body;
  const user1 = await userService.getUserByReferId(referralCode);
  const user2 = await userService.getUserById(req.params.userId);
  console.log(user2);
  console.log(user1);

const isReferred = user1.referral.isReferred;

  
  // if (user1) {
    // Find User 2
    // if(user2)
    // {
    //   const isReferred = await user2.referral.isReferred;
    //   if(isReferred == true){
    //     throw new ApiError(httpStatus.NOT_FOUND, 'User Already Referred');
    //   }
    // }
    // // Add the Id of user2 into the array of referred users of this user1..

    // // Update the Wallets of both users..

  // }
  // else throw new ApiError(httpStatus.NOT_FOUND, 'Wrong Code Entered');
     
  res.send(user1);
});

module.exports = {
   getUser,
  };