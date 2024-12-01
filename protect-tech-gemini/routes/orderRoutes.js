const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/', authenticateJWT, OrderController.getOrders);
router.get('/:id', authenticateJWT, OrderController.getOrderById);
router.post('/', authenticateJWT, OrderController.createOrder);
router.put('/:id', authenticateJWT, OrderController.updateOrder);
router.delete('/:id', authenticateJWT, OrderController.deleteOrder);

module.exports = router;