import User from '../models/UserModel.mjs';
import bcrypt from 'bcryptjs';
import { ErrorHandler } from '../utls/ErrorHandler.mjs';
import { sendToken } from '../utls/jwtToken.mjs';

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
