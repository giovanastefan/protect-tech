const Order = require('../models/orderModel');

const OrderService = {
  getOrdersByUserId: async (userId) => {
    return await Order.getAll(userId);
  },

  getOrderById: async (orderId) => {
    return await Order.getById(orderId);
  },

  createOrder: async (userId, order_status, total_amount, payment_method, address_id) => {
    return await Order.create(userId, order_status, total_amount, payment_method, address_id);
  },

  updateOrder: async (orderId, order_status, total_amount, payment_method, address_id) => {
    return await Order.update(orderId, order_status, total_amount, payment_method, address_id);
  },

  deleteOrder: async (orderId) => {
    return await Order.delete(orderId);
  },
};

module.exports = OrderService;