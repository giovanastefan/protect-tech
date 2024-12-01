const OrderService = require('../services/orderService');

const OrderController = {
  getOrders: async (req, res) => {
    const userId = req.user.user_id; 
    try {
      const orders = await OrderService.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getOrderById: async (req, res) => {
    const orderId = parseInt(req.params.id);
    try {
      const order = await OrderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrder: async (req, res) => {
    const userId = req.user.user_id; 
    const { order_status, total_amount, payment_method, address_id } = req.body;
    try {
      const newOrder = await OrderService.createOrder(userId, order_status, total_amount, payment_method, address_id);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    const orderId = parseInt(req.params.id);
    const { order_status, total_amount, payment_method, address_id } = req.body;
    try {
      const updatedOrder = await OrderService.updateOrder(orderId, order_status, total_amount, payment_method, address_id);
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    const orderId = parseInt(req.params.id);
    try {
      const deleted = await OrderService.deleteOrder(orderId);
      if (!deleted) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = OrderController;