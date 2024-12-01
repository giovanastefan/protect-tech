const pool = require('../config/database');

const Cart = {
  getAll: async (userId) => {
    const result = await pool.query(
      `SELECT c.id, c.quantity, p.product_id, p.name, p.price, p.promotional_price, p.image_url 
      FROM cart c 
      JOIN products p ON c.product_id = p.product_id 
      WHERE c.user_id = $1`,
      [userId]
    );
    return result.rows;
  },
  addItem: async (userId, productId, quantity) => {
    const result = await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [userId, productId, quantity]
    );
    return result.rows[0];
  },
  updateItem: async (cartId, quantity) => {
    const result = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, cartId]
    );
    return result.rows[0];
  },
  deleteItem: async (cartId) => {
    const result = await pool.query('DELETE FROM cart WHERE id = $1', [cartId]);
    return result.rowCount;
  },
  clearCart: async (userId) => {
    const result = await pool.query('DELETE FROM cart WHERE user_id = $1', [userId]);
    return result.rowCount;
  }
};

module.exports = Cart;