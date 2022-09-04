const express = require('express');
const router = express.Router();
const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getSingleProductReviews,
  deleteReview,
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
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require('../controller/UserController');
const cookieParser = require('cookie-parser');
const {
  createOrder,
  getSingleOrder,
  getAllOrders,
} = require('../controller/OrderController');
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
router.post('/product/review', isAuthenticationUser, createProductReview);
router.get('/reviews', getSingleProductReviews);
router.delete(
  '/reviews',
  isAuthenticationUser,
  authorizeRoles('admin'),
  deleteReview
);

//user parts

router.post('/register', userRegister);
router.post('/login', userlogin);
router.get('/logout', userlogout);
router.post('/forgotpassword', forgetPassword);
router.put('/password/reset/:token', resetPassword);
router.put('/me/update', isAuthenticationUser, updatePassword);
router.get('/me', isAuthenticationUser, userDetails);
router.put('/me/update/info', isAuthenticationUser, updateProfile);
router.get(
  '/admin/users',
  isAuthenticationUser,
  authorizeRoles('admin'),
  getAllUsers
);
router.get(
  '/admin/user/:id',
  isAuthenticationUser,
  authorizeRoles('admin'),
  getSingleUser
);
router.put(
  '/admin/user/:id',
  isAuthenticationUser,
  authorizeRoles('admin'),
  updateUserRole
);
router.delete(
  '/admin/user/:id',
  isAuthenticationUser,
  authorizeRoles('admin'),
  deleteUser
);

//order model//
router.post('/order/new', isAuthenticationUser, createOrder);
router.get('/order/:id', isAuthenticationUser, getSingleOrder);
router.get('/orders/me', isAuthenticationUser, getAllOrders);
module.exports = router;
