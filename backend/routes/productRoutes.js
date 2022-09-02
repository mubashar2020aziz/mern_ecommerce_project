const express = require('express');
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require('../controller/productController');

const { isAuthenticationUser, authorizeRoles } = require('../middleware/auth');

const {
  userlogin,
  userlogout,
  userRegister,
  forgetPassword,
  resetPassword,
  userDetails,
  updatePassword,
} = require('../controller/UserController');
const cookieParser = require('cookie-parser');
//middleware
router.use(cookieParser());

router.get('/product', getAllProduct);
router.post(
  '/product/new',
  isAuthenticationUser,
  authorizeRoles('admin'),
  createProduct
);
router.put(
  '/product/:id',
  isAuthenticationUser,
  authorizeRoles('admin'),
  updateProduct
);
router.delete(
  '/product/:id',
  isAuthenticationUser,
  authorizeRoles('admin'),
  deleteProduct
);
router.get('/product/:id', getSingleProduct);

//user parts

router.post('/register', userRegister);
router.post('/login', userlogin);
router.get('/logout', userlogout);
router.post('/forgotpassword', forgetPassword);
router.put('/password/reset/:token', resetPassword);
router.put('/me/update', isAuthenticationUser, updatePassword);
router.get('/me', isAuthenticationUser, userDetails);

module.exports = router;
