const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  getAll: async () => {
    const result = await pool.query('SELECT user_id, email, first_name, last_name FROM users');
    return result.rows;
  },
  getById: async (userId) => {
    const result = await pool.query('SELECT user_id, email, first_name, last_name FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  },
  getByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
  create: async (email, first_name, last_name, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING user_id, email, first_name, last_name',
      [email, first_name, last_name, hashedPassword]
    );
    return result.rows[0];
  },
  update: async (userId, email, first_name, last_name, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'UPDATE users SET email = $1, first_name = $2, last_name = $3, password = $4 WHERE user_id = $5 RETURNING user_id, email, first_name, last_name',
      [email, first_name, last_name, hashedPassword, userId]
    );
    return result.rows[0];
  },
  delete: async (userId) => {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1', [userId]);
    return result.rowCount;
  },
};

module.exports = User;