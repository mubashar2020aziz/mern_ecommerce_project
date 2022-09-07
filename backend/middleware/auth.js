const ErrorHandler = require('../utls/ErrorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.isAuthenticationUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new ErrorHandler(
        'please enter your email for access this resourcess',
        401
      )
    );
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData._id);

  next();
};

//admin role

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} can not access this resources`, 500)
      );
    }
    next();
  };
};

// export const authorizeRoles = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(400).json({ message: 'admin access denied' });
//   }
//   next();
// };
