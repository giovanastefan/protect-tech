const Cart = require('../models/cartModel');

const CartService = {
  getCartByUserId: async (userId) => {
    return await Cart.getAll(userId);
  },

  addItemToCart: async (userId, productId, quantity) => {
    return await Cart.addItem(userId, productId, quantity);
  },

  updateCartItem: async (cartId, quantity) => {
    return await Cart.updateItem(cartId, quantity);
  },

  deleteItemFromCart: async (cartId) => {
    return await Cart.deleteItem(cartId);
  },

  clearCart: async (userId) => {
    return await Cart.clearCart(userId);
  }
};

module.exports = CartService;