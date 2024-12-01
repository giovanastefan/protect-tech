const pool = require('../config/database');

const Address = {
  getAll: async (userId) => {
    const result = await pool.query('SELECT * FROM address WHERE user_id = $1', [userId]);
    return result.rows;
  },
  getById: async (addressId) => {
    const result = await pool.query('SELECT * FROM address WHERE id = $1', [addressId]);
    return result.rows[0];
  },
  create: async (userId, street, number, neighborhood, city, state) => {
    const result = await pool.query(
      'INSERT INTO address (user_id, street, number, neighborhood, city, state) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, street, number, neighborhood, city, state]
    );
    return result.rows[0];
  },
  update: async (addressId, street, number, neighborhood, city, state) => {
    const result = await pool.query(
      'UPDATE address SET street = $1, number = $2, neighborhood = $3, city = $4, state = $5 WHERE id = $6 RETURNING *',
      [street, number, neighborhood, city, state, addressId]
    );
    return result.rows[0];
  },
  delete: async (addressId) => {
    const result = await pool.query('DELETE FROM address WHERE id = $1', [addressId]);
    return result.rowCount;
  },
};

module.exports = Address;