const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Rotas de Carrinho
router.post('/', authMiddleware, cartController.addItemToCart);
router.get('/', authMiddleware, cartController.getCartItems);
router.delete('/clear', authMiddleware, cartController.clearCart);
router.put('/:id', authMiddleware, cartController.updateCartItemQuantity);
router.delete('/:id', authMiddleware, cartController.removeCartItem);

module.exports = router;
