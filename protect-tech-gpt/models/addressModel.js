const pool = require('../config/db');

class Address {
  static async create({ userId, street, number, neighborhood, city, state }) {
    const result = await pool.query(
      `INSERT INTO address (user_id, street, number, neighborhood, city, state)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, street, number, neighborhood, city, state]
    );
    return result.rows[0];
  }

  static async getAll(userId) {
    const result = await pool.query(
      `SELECT * FROM address WHERE user_id = $1`,
      [userId]
    );
    return result.rows;
  }

  static async getById(id, userId) {
    const result = await pool.query(
      `SELECT * FROM address WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );
    return result.rows[0];
  }

  static async update(id, userId, { street, number, neighborhood, city, state }) {
    const result = await pool.query(
      `UPDATE address
       SET street = $1, number = $2, neighborhood = $3, city = $4, state = $5
       WHERE id = $6 AND user_id = $7 RETURNING *`,
      [street, number, neighborhood, city, state, id, userId]
    );
    return result.rows[0];
  }

  static async delete(id, userId) {
    const result = await pool.query(
      `DELETE FROM address WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, userId]
    );
    return result.rows[0];
  }
}

module.exports = Address;
