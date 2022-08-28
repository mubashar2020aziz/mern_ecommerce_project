import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto-js';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'please enter your name at least 3 chatacter'],
    maxlength: [20, 'please can not exceed from 20 character'],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,

    minlength: [8, 'please enter your password at least 8 chatacter'],
  },
  avator: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//hash password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//forgot password
userSchema.methods.getResetToken = async function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString('hex');
  //hashing and add resetPasswordToken to userSchema
};

const User = mongoose.model('User11', userSchema);
export default User;
