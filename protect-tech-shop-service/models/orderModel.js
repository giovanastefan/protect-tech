const pool = require("../database/connection");

const executeQuery = async (query, params = []) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    throw new Error(`Database query failed: ${error.message}`);
  }
};

exports.getAllOrders = async () => {
  const query = `
    SELECT O.id AS order_id, U.first_name, U.last_name, O.order_status, O.total_amount, O.order_date
    FROM orders O 
    INNER JOIN users U ON O.user_id = U.user_id 
  `;
  return await executeQuery(query, []);
};

exports.getAllOrdersByUserId = async (userId) => {
  const query = `
    SELECT O.id AS order_id, U.first_name, U.last_name, O.order_status, O.total_amount, O.order_date
    FROM orders O 
    INNER JOIN users U ON O.user_id = U.user_id 
    WHERE O.user_id = $1;
  `;
  return await executeQuery(query, [userId]);
};

exports.getOrderById = async (orderId) => {
  const query = `
    SELECT O.id AS order_id, U.first_name, U.last_name, O.order_status, O.total_amount, O.order_date
    FROM orders O 
    INNER JOIN users U ON O.user_id = U.user_id 
    WHERE O.id = $1;
  `;
  return await executeQuery(query, [orderId]);
};

exports.updateOrder = async (orderId, updatedOrder) => {
  const { orderStatus, totalAmount, paymentMethod, addressId } = updatedOrder;
  const query = `
    UPDATE orders 
    SET order_status = $1, total_amount = $2, payment_method = $3, address_id = $4 
    WHERE id = $5
    RETURNING *;
  `;

  return await executeQuery(query, [
    orderStatus,
    totalAmount,
    paymentMethod,
    addressId,
    orderId,
  ]);
};
