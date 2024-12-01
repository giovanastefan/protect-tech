const pool = require('../config/db');

class Order {
  static async create({ userId, totalAmount, paymentMethod, addressId }) {
    const result = await pool.query(
      `INSERT INTO orders (user_id, total_amount, payment_method, address_id, order_status)
       VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
      [userId, totalAmount, paymentMethod, addressId]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
  }

  static async getByUserId(userId) {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    return result.rows;
  }

  static async getById(orderId) {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    return result.rows[0];
  }

  static async updateStatus(orderId, status) {
    const result = await pool.query(
      `UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *`,
      [status, orderId]
    );
    return result.rows[0];
  }

  static async delete(orderId) {
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [orderId]);
    return result.rows[0];
  }
}

module.exports = Order;
