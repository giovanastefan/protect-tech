const Product = require('../models/productModel');

const ProductService = {
  getAllProducts: async () => {
    return await Product.getAll();
  },

  getProductById: async (productId) => {
    return await Product.getById(productId);
  },

  createProduct: async (name, price, promotional_price, description, image_url) => {
    return await Product.create(name, price, promotional_price, description, image_url);
  },

  updateProduct: async (productId, name, price, promotional_price, description, image_url) => {
    return await Product.update(productId, name, price, promotional_price, description, image_url);
  },

  deleteProduct: async (productId) => {
    return await Product.delete(productId);
  },

  searchProducts: async (query) => {
    return await Product.searchByName(query);
  },

  orderProducts: async (column) => {
    return await Product.orderBy(column);
  }
};

module.exports = ProductService;