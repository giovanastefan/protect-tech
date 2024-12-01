const ProductService = require('../services/productService');

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductById: async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
      const product = await ProductService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduct: async (req, res) => {
    const { name, price, promotional_price, description, image_url } = req.body;
    try {
      const newProduct = await ProductService.createProduct(name, price, promotional_price, description, image_url);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price, promotional_price, description, image_url } = req.body;
    try {
      const updatedProduct = await ProductService.updateProduct(productId, name, price, promotional_price, description, image_url);
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
      const deleted = await ProductService.deleteProduct(productId);
      if (!deleted) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchProducts: async (req, res) => {
    const query = req.query.q;
    try {
      const products = await ProductService.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  orderProducts: async (req, res) => {
    const column = req.query.column;
    try {
      const products = await ProductService.orderProducts(column);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ProductController;