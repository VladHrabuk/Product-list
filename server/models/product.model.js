const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Please, add url of product'],
  },
  name: {
    type: String,
    required: [true, 'Please, enter name'],
    minLength: [3, 'The length of product name should be more than 2 symbols'],
    maxLength: [
      99,
      'The length of product name should be less than 99 symbols',
    ],
  },
  count: {
    type: Number,
    required: [true, 'Please, enter count of products'],
  },
  size: {
    width: {
      type: Number,
      required: [true, 'Please, enter width of product'],
    },
    height: {
      type: Number,
      required: [true, 'Please, enter=height of product'],
    },
  },
  weight: {
    type: String,
    required: [true, 'Please, enter width of product'],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
