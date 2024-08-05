const Product = require('../models/product.model');
const ApiError = require('../exceptions/api-error');

async function getAllProducts(req, res, next) {
  try {
    const sortOption = req.query.sort || 'alphabetical';

    let sortOptions = {};

    if (sortOption === 'count') {
      sortOptions = { count: 1 };
    } else {
      sortOptions = { name: 1 };
    }

    const products = await Product.find({}).sort(sortOptions);
    const totalCount = await Product.countDocuments({});

    return res.status(200).json({
      totalCount,
      data: products,
    });
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    next(ApiError.notFound("Product with that id isn't found"));
  }
}

async function createProduct(req, res, next) {
  try {
    const { imageUrl, name, count, size, weight } = req.body;
    const newProduct = await Product.create({
      imageUrl,
      name,
      count,
      size,
      weight,
      comments: [],
    });
    res.status(201).json(newProduct);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(
        (error) => error.message
      );
      return res
        .status(400)
        .json({ error: 'Validation Error', messages: validationErrors });
    }
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(204).json(null);
  } catch (err) {
    next(ApiError.notFound("Product with that id isn't found"));
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { imageUrl, name, count, size, weight, comments = [] } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { imageUrl, name, count, size, weight, comments },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return next(ApiError.notFound("Product with that id isn't found"));
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(
        (error) => error.message
      );
      return res
        .status(400)
        .json({ error: 'Validation Error', messages: validationErrors });
    }
    next(err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
