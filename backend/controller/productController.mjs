import Product from '../models/productModel.mjs';
import Features from '../utls/Features.mjs';

//create product
export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//get All product

export const getAllProduct = async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  // const products = await Product.find();
  const products = await feature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
};

//update product--onlyAdmin

export const updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'product is not found with this id',
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};
//delete product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'product is not found by this id',
    });
  }
  await product.remove();
  return res.status(200).json({
    success: true,
    message: 'product delete successfully',
  });
};

// single product detail
export const getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'product not found by this id',
    });
  }
  res.status(200);
  product;
  productCount;
};
