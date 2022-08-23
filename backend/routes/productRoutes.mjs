import { getAllProduct } from '../controller/productController.mjs';
import express from 'express';
const router = express.Router();

router.get('/product', getAllProduct);

export default router;
