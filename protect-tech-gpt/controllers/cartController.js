const Cart = require('../models/cartModel');

exports.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    const cartItem = await Cart.addItem({ userId, productId, quantity });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    const items = await Cart.getItems(userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updatedItem = await Cart.updateQuantity(id, quantity);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const removedItem = await Cart.removeItem(id);
    if (!removedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await Cart.clearCart(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
