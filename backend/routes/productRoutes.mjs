import {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} from '../controller/productController.mjs';

import express from 'express';
const router = express.Router();

router.get('/product', getAllProduct);
router.post('/product/new', createProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/product/:id', getSingleProduct);
export default router;
