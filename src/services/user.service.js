
const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const AWS = require("aws-sdk");
const AWSCONFIG  =  require("../config/aws.config");
const { avatarBucketparams } =  require("../config/awsBucket");

const s3 = new AWS.S3();
s3.config.update(AWSCONFIG);

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await !User.isEmailTaken(userBody.email)) {
    const user = await User.create(userBody);
    return user;
  }
};

const createUserGoogleAuth = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    const user = await User.findOne({ email : userBody.email } , (err) => console.log(err));
    return user;
  }else{
    console.log(userBody);
    const user = await User.create(userBody);
    return user;
  }
  
};

const createUserPhoneAuth = async (userBody) => {
  if (await User.isPhoneNumberTaken(userBody.phone)) {

    const user = await User.find({phone:userBody.phone});
    return user;
  }
  else{
    console.log(userBody);
    const user = await User.create(userBody);
    return user;
  }
};

const createUserTruecallerAuth = async (userBody) => {
  if (await User.isPhoneNumberTaken(userBody.phone)) {
    const user = await User.findOne({ phone : userBody.phone } , (err) => console.log(err));
    return user;
  }else{
    const user = await User.create(userBody);
    return user;
  }
  
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by referId
 * @param {ObjectId} referralCode
 * @returns {Promise<User>}
 */
const getUserByReferId = async (referralCode) => {
  return await User.find({referralCode});
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Get User By Phone
 * @param {ObjectId} phone
 * @returns {Promise<User>}
 */
const getUserByPhone = async (phone) => {
  const user = await User.find({phone});
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};


/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

/**
 * Update user profiel by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserProfileById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return await User.findOneAndUpdate({ "_id": userId } ,{$set: {"profile" : updateBody}}, {new:true});
};


/**
 * Update Avatar In user's profile by id
 * @param {ObjectId} userId
 * @param {getURL} pre-signed URL Generated From AWS S3
 * @returns {Promise<User>}
 */
const updateAvatarByUserId = async(userId, getURL) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await User.findOneAndUpdate({"_id": userId},{$set:{"profile.avatar" : getURL}});
}

/**
 * Update Avatar In user's profile by id
 * @param {ObjectId} userId
 * @param {res} responses
 * @returns {Promise<User>}
 */
const getImageUrl = async(userId,res) => {
  await s3.getSignedUrl('putObject',avatarBucketparams,(err,signedURL) => {
    if(err) {
      console.log(err);
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    const urls = {
      postURL: signedURL,
      getURL: signedURL.split("?")[0],
    }
    updateAvatarByUserId(userId,urls.getURL);
    return res.json(urls);
  });
}


module.exports = {
  createUser,
  createUserGoogleAuth,
  createUserTruecallerAuth,
  createUserPhoneAuth,
  queryUsers,
  getUserById,
  getUserByReferId,
  getUserByEmail,
  getUserByPhone,
  updateUserById,
  deleteUserById,
  updateUserProfileById,
  getImageUrl
};
