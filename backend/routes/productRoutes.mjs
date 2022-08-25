import {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from '../controller/productController.mjs';
import { createUser, Userlogin } from '../controller/UserController.mjs';

import express from 'express';
const router = express.Router();

router.get('/product', getAllProduct);
router.post('/product/new', createProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/product/:id', getSingleProduct);
router.post('/registeration', createUser);
router.post('/login', Userlogin);
export default router;
