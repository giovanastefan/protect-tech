const pool = require('../config/db');

class Product {
  static async create({ name, price, promotionalPrice, description, imageUrl }) {
    const result = await pool.query(
      `INSERT INTO products (name, price, promotional_price, description, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, promotionalPrice, description, imageUrl]
    );
    return result.rows[0];
  }

  static async getAll({ search, sortBy }) {
    let query = 'SELECT * FROM products';
    const params = [];

    // Adicionando filtro de pesquisa
    if (search) {
      params.push(`%${search}%`);
      query += ` WHERE name ILIKE $${params.length}`;
    }

    // Adicionando ordenação
    if (sortBy) {
      query += ` ORDER BY ${sortBy}`;
    }

    const result = await pool.query(query, params);
    console.log('query', result)
    return result.rows;
  }

  static async getById(productId) {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [productId]);
    return result.rows[0];
  }

  static async update(productId, { name, price, promotionalPrice, description, imageUrl }) {
    const result = await pool.query(
      `UPDATE products
       SET name = $1, price = $2, promotional_price = $3, description = $4, image_url = $5
       WHERE product_id = $6
       RETURNING *`,
      [name, price, promotionalPrice, description, imageUrl, productId]
    );
    return result.rows[0];
  }

  static async delete(productId) {
    const result = await pool.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [productId]);
    return result.rows[0];
  }
}

module.exports = Product;
