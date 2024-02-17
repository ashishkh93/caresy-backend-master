const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { authTypes } = require('../config/authtypes');
const { number } = require('joi');

const userSchema = mongoose.Schema(
  {
    babies : [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Baby',
    }],
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    otp: {
      type: Number,
    },
    otpExpire: {
      type: Number,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    authType: {
      type: String,
      enum: authTypes,
      // required: true,
      // default : 'phoneAuth',
    },
    notificationToken: {
      type: String,
    },
    profile: {
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      birthDate: {
        type: Date,
        // required: true,
        trim: true,
      },
      parentType: {
        type: String,
        enum: ['Father', 'Mother'],
        default: 'Mother',
      },
    },
    wallet : {
      type : mongoose.SchemaTypes.ObjectId,
      ref : 'Wallet',
    },
    referral: {
      referralCode: {
        type: String,
      },
      isReferred: {
        type: Boolean,
        default: false,
      },
      usersReferred: [{
        type: String,
      }],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if phoneNumber is taken
 * @param {string} phone - The user's phone number
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

userSchema.statics.isPhoneNumberTaken = async function (phone, excludeUserId) {
  const user = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Function referral code on create..s

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
