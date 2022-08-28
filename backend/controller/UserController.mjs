import User from '../models/UserModel.mjs';
import { ErrorHandler } from '../utls/ErrorHandler.mjs';
import { sendToken } from '../utls/jwtToken.mjs';
import { sendMail } from '../utls/sendMail.mjs';

//Registeration user
export const userRegister = async (req, res, next) => {
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

export const userlogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('please fill this form', 400));
  }
  const user = await User.findOne({ email });
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

export const userlogout = async (req, res, next) => {
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

export const forgetPassword = async (req, res, next) => {
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
    return next(new ErrorHandler(error.message));
  }
};
