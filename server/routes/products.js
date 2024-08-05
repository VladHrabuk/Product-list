const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');

router.route('/').get(getAllProducts).post(createProduct);

router
  .route('/:id')
  .get(getProductById)
  .delete(deleteProduct)
  .put(updateProduct);

module.exports = {
  router,
};
