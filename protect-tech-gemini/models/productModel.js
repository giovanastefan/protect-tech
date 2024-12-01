const pool = require('../config/database');

const Product = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  },
  getById: async (productId) => {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [productId]);
    return result.rows[0];
  },
  create: async (name, price, promotional_price, description, image_url) => {
    const result = await pool.query(
      'INSERT INTO products (name, price, promotional_price, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, promotional_price, description, image_url]
    );
    return result.rows[0];
  },
  update: async (productId, name, price, promotional_price, description, image_url) => {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, promotional_price = $3, description = $4, image_url = $5 WHERE product_id = $6 RETURNING *',
      [name, price, promotional_price, description, image_url, productId]
    );
    return result.rows[0];
  },
  delete: async (productId) => {
    const result = await pool.query('DELETE FROM products WHERE product_id = $1', [productId]);
    return result.rowCount;
  },
  searchByName: async (query) => {
    const result = await pool.query("SELECT * FROM products WHERE name ILIKE $1", [`%${query}%`]);
    return result.rows;
  },
  orderBy: async (column) => {
    const allowedColumns = ['name', 'price'];
    if (!allowedColumns.includes(column)) {
      throw new Error('Coluna inválida para ordenação.');
    }
    const result = await pool.query(`SELECT * FROM products ORDER BY ${column}`);
    return result.rows;
  }
};

module.exports = Product;