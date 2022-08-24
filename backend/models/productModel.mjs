import express from 'express';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,

      trim: true,
      maxlength: [20, 'please dont increase the 20 character'],
    },
    descrition: {
      type: String,
      maxlength: [4000, 'please dont increase the 4000 character'],
    },
    price: {
      type: Number,
      maxlength: [8, 'please dont increase the 8 character'],
    },
    discountprice: {
      type: String,
      maxlength: [4, 'please dont increase the 4 character'],
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    rating: {
      type: String,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true],
    },
    stock: {
      type: Number,
      required: [true],
      maxlength: [4, 'please dont increase the 4 character'],
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
        },
        time: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
