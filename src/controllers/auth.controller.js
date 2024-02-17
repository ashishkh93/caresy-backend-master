const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const generateOtp = require('../utils/common.util');
const { userModel } = require("../models");
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  // const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user });
});
const phoneRegister = catchAsync(async (req, res) => {
  const body = req.body
  const { phone } = req.body

  // check user.. send otp.. create user.. send otp
  const { otp , otpExpire } = await generateOtp(10, phone, 91);
  const userBody = { ...body , otp , otpExpire}
  const user = await userService.createUserPhoneAuth(userBody);
  res.status(httpStatus.CREATED).send({ user });
});

const phoneVerify = catchAsync(async (req, res) => {
  const {phone,otp} = req.body
  // phone, otp  .... if user..error no phone.. if otp expire.. error .. send otp... 
  const user = await userService.getUserByPhone( phone )
    if(user){
      if(otp === user.otp){
            if(Date.now() < user.otpExpire){
              const tokens = await tokenService.generateAuthTokens(user);
              res.status(httpStatus.CREATED).send({ user, tokens });
            }
            else {
              throw new ApiError(httpStatus['400_MESSAGE'], 'OTP expired');
            } 
          }
        
      else  throw new ApiError(httpStatus.BAD_REQUEST, 'OTP did not match');
    
      }
    
    else throw new ApiError(httpStatus.BAD_REQUEST, 'No User registered with this phone no.');
});

const googleAuth = catchAsync(async (req, res) => {
  const { name , email , avatar , authType , ...otherparams } = req.body;
  const userBody = {
    email,
    authType,
    profile : {
      name,
      avatar,
    },
    ...otherparams,
  }
  const user = await userService.createUserGoogleAuth(userBody);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
  console.log(tokens);
});

const truecallerAuth = catchAsync(async (req, res) => {
  const { phone , avatar , name , authType , ...otherparams } = req.body;

  const userBody = {
    phone,
    authType,
    profile : {
      name ,
      avatar,
    },
    ...otherparams,
  }

  const user = await userService.createUserTruecallerAuth(userBody);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  phoneRegister,
  phoneVerify,
  googleAuth,
  truecallerAuth,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
