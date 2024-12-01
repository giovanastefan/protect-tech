const CartService = require('../services/cartService');

const CartController = {
  getCart: async (req, res) => {
    const userId = req.user.user_id; 
    try {
      const cart = await CartService.getCartByUserId(userId);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addItemToCart: async (req, res) => {
    const userId = req.user.user_id; 
    const { product_id, quantity } = req.body;
    try {
      const newItem = await CartService.addItemToCart(userId, product_id, quantity);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateCartItem: async (req, res) => {
    const cartId = parseInt(req.params.id);
    const { quantity } = req.body;
    try {
      const updatedItem = await CartService.updateCartItem(cartId, quantity);
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item não encontrado no carrinho' });
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteItemFromCart: async (req, res) => {
    const cartId = parseInt(req.params.id);
    try {
      const deleted = await CartService.deleteItemFromCart(cartId);
      if (!deleted) {
        return res.status(404).json({ error: 'Item não encontrado no carrinho' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  clearCart: async (req, res) => {
    const userId = req.user.user_id;
    try {
      await CartService.clearCart(userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = CartController;