const pool = require('../config/db');

class Cart {
  static async addItem({ userId, productId, quantity }) {
    // Verificar se o produto já está no carrinho
    const existingItem = await pool.query(
      `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`,
      [userId, productId]
    );

    if (existingItem.rows.length > 0) {
      // Atualizar quantidade se o produto já estiver no carrinho
      const result = await pool.query(
        `UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *`,
        [quantity, userId, productId]
      );
      return result.rows[0];
    }

    // Adicionar novo item ao carrinho
    const result = await pool.query(
      `INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`,
      [userId, productId, quantity]
    );
    return result.rows[0];
  }

  static async getItems(userId) {
    const result = await pool.query(
      `SELECT cart.id, cart.product_id, cart.quantity, products.name, products.price, products.promotional_price, products.image_url
       FROM cart
       JOIN products ON cart.product_id = products.product_id
       WHERE cart.user_id = $1`,
      [userId]
    );
    return result.rows;
  }

  static async updateQuantity(cartId, quantity) {
    const result = await pool.query(
      `UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *`,
      [quantity, cartId]
    );
    return result.rows[0];
  }

  static async removeItem(cartId) {
    const result = await pool.query(
      `DELETE FROM cart WHERE id = $1 RETURNING *`,
      [cartId]
    );
    return result.rows[0];
  }

  static async clearCart(userId) {
    await pool.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
    return { message: 'Cart cleared successfully' };
  }
}

module.exports = Cart;
