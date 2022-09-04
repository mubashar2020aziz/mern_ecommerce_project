const Order = require('.././models/OrderModel');
const ErrorHandler = require('.././utls/ErrorHandler');
const Product = require('.././models/productModel');

//create order
exports.createOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
};

// get single order //
exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('order not found with this id', 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
};

//get all orders //
exports.getAllOrders = async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
};

// get all order by admin
exports.getAdminAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
    totalAmount,
  });
};

// update order status by admin//
// exports.updateAdminOrder = async (req, res, next) => {
//   const order = await Order.findById(req.params.id);
//   if (!order) {
//     return next(new ErrorHandler('order not found with this id', 404));
//   }
//   if (order.orderStatus === 'Delivered') {
//     return next(new ErrorHandler('you have already delivered this order', 400));
//   }
//   if (req.body.status === 'Shipped') {
//     order.orderItems.forEach(async (order) => {
//       await updateStock(order.product, order.quantity);
//     });
//   }
//   order.orderStatus = req.body.status;
//   if (req.body.status === 'Delivered') {
//     order.deliveredAt = Date.now();
//   }
//   await order.save({
//     validateBeforeSave: false,
//   });
//   res.status(200).json({
//     success: true,
//   });

//   async function updateStock(id, quantity) {
//     const product = await Product.findById(id);
//     product.Stock -= quantity;
//     await product.save({ validateBeforeSave: false });
//   }
// };
