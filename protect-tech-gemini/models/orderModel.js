const pool = require('../config/database');

const Order = {
  getAll: async (userId) => {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    return result.rows;
  },
  getById: async (orderId) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    return result.rows[0];
  },
  create: async (userId, order_status, total_amount, payment_method, address_id) => {
    const result = await pool.query(
      'INSERT INTO orders (user_id, order_status, total_amount, payment_method, address_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, order_status, total_amount, payment_method, address_id]
    );
    return result.rows[0];
  },
  update: async (orderId, order_status, total_amount, payment_method, address_id) => {
    const result = await pool.query(
      'UPDATE orders SET order_status = $1, total_amount = $2, payment_method = $3, address_id = $4 WHERE id = $5 RETURNING *',
      [order_status, total_amount, payment_method, address_id, orderId]
    );
    return result.rows[0];
  },
  delete: async (orderId) => {
    const result = await pool.query('DELETE FROM orders WHERE id = $1', [orderId]);
    return result.rowCount;
  },
};

module.exports = Order;