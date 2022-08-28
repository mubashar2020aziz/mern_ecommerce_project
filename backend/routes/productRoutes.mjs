import {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from '../controller/productController.mjs';
import cookieParser from 'cookie-parser';
import { isAuthenticationUser, authorizeRoles } from '../middleware/auth.mjs';

import express from 'express';
import {
  userlogin,
  userlogout,
  userRegister,
} from '../controller/UserController.mjs';

const router = express.Router();

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
export default router;
