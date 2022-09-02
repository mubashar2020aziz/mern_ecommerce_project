const User = require('../models/UserModel');
const ErrorHandler = require('../utls/ErrorHandler');
const sendToken = require('../utls/jwtToken');
const sendMail = require('../utls/sendMail');
const crypto = require('crypto');

//Registeration user
exports.userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avator: {
      public_id: 'https://test.com',
      url: 'https://test.com',
    },
  });
  sendToken(user, 201, res);
};

// user login

exports.userlogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('please fill this form', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('user not found with email & password', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler('user not found with this email and password', 401)
    );
  }
  sendToken(user, 201, res);
};

//logout page

exports.userlogout = async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'logout successfully',
  });
};

// forgot password

exports.forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('user email not found', 404));
  }

  //get resetPassword token
  const resetToken = user.getResetToken();
  await user.save({
    validateBeforeSave: false,
  });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`;
  const message = `your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Ecommerce Password Recover`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });
    return next(new ErrorHandler(error.message, 500));
  }
};

//Reset password

exports.resetPassword = async (req, res, next) => {
  // create token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler('Reset password url is invalid or has been expired', 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler('password is not matched with the new password', 400)
    );
  }
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();
  sendToken(user, 200, res);
};

// get user detail
exports.userDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

// update user password
exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('old Password is incorrect', 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Error('password not matched with each other', 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
};
