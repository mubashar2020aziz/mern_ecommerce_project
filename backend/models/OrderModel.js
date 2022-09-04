const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    shippingInfo: {
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
      },
      pinCode: {
        type: Number,
      },
      phoneNo: {
        type: Number,
      },
    },
    orderItems: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        Image: {
          type: String,
        },
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },
    paidAt: {
      type: Date,
    },
    itemsPrice: {
      type: Number,
      default: 0,
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,

      default: 0,
    },
    orderStatus: {
      type: String,

      default: 'Processing',
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model('Order', orderSchema);
