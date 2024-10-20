const pool = require("../database/connection");

const executeQuery = async (query, params = []) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }
};

exports.getAllProducts = async () => {
  const query = "SELECT * FROM products;";
  return executeQuery(query);
};

exports.getProductDetailsById = async (productId) => {
  const query = "SELECT * FROM products WHERE product_id = $1;";
  return executeQuery(query, [productId]);
};

const axios = require("axios");

exports.createProduct = async ({
  name,
  price,
  promotionalPrice,
  description,
  imageUrl,
}) => {
  try {
    // A10 Fail - Server-Side Request Forgery (SSRF):
    // 1. The application allows the user to provide a URL for the 'imageUrl' field without
    // proper validation or sanitization, making it vulnerable to SSRF attacks. An attacker
    // can exploit this by submitting a URL that forces the server to make requests to internal
    // services or sensitive endpoints.

    await axios.get(imageUrl);

    const query = `
        INSERT INTO products (name, price, promotional_price, description, image_url) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    return executeQuery(query, [
      name,
      price,
      promotionalPrice,
      description,
      imageUrl,
    ]);
  } catch (error) {
    throw new Error(`Error in create product: ${error.message}`);
  }
};

exports.updateProduct = async (
  productId,
  { name, price, promotionalPrice, description, imageUrl }
) => {
  const query = `
        UPDATE products 
        SET name = $1, price = $2, promotional_price = $3, description = $4, image_url = $5 
        WHERE product_id = $6;
    `;
  return executeQuery(query, [
    name,
    price,
    promotionalPrice,
    description,
    imageUrl,
    productId,
  ]);
};

exports.deleteProduct = async (productId) => {
  const query = "DELETE FROM products WHERE product_id = $1;";
  return executeQuery(query, [productId]);
};

exports.searchProducts = async (searchQuery) => {
  // A03: Injection - The searchQuery is directly embedded in the SQL query without any validation or sanitization.
  // This exposes the application to SQL Injection attacks, allowing an attacker to manipulate the query
  // and potentially gain unauthorized access to data or execute harmful SQL commands.
  const query = `SELECT * FROM products WHERE name ILIKE '%${searchQuery}%'`;
  const result = await pool.query(query);

  return result.rows;
};
