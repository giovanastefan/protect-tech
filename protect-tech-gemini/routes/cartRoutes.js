const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/', authenticateJWT, CartController.getCart);
router.post('/', authenticateJWT, CartController.addItemToCart);
router.put('/:id', authenticateJWT, CartController.updateCartItem);
router.delete('/:id', authenticateJWT, CartController.deleteItemFromCart);
router.delete('/', authenticateJWT, CartController.clearCart); 

module.exports = router;