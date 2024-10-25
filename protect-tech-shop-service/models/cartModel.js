const pool = require("../database/connection");

exports.getShoppingCart = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT C.quantity, P.name, P.price,  P.promotional_price, p.image_url, C.product_id
       FROM cart C 
       INNER JOIN products P ON C.product_id = P.product_id 
       WHERE C.user_id = $1`,
      [userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.rows);
      }
    );
  });
};

exports.addToCart = (userId, productId, quantity) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT quantity FROM cart WHERE product_id = $1 AND user_id = $2`,
      [productId, userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }

        if (result.rows.length > 0) {
          pool.query(
            `UPDATE cart 
             SET quantity = quantity + $1 
             WHERE product_id = $2 AND user_id = $3`,
            [quantity, productId, userId],
            (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            }
          );
        } else {
          pool.query(
            `INSERT INTO cart (user_id, product_id, quantity) 
             VALUES ($1, $2, $3)`,
            [userId, productId, quantity],
            (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            }
          );
        }
      }
    );
  });
};

exports.removeFromCart = (productId, userId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM cart 
       WHERE product_id = $1 AND user_id = $2`,
      [productId, userId],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      }
    );
  });
};

exports.submitOrder = (userId, addressId, paymentMethod, totalAmount) => {
  return new Promise((resolve, reject) => {
    pool.query("BEGIN", (err) => {
      if (err) return reject(err);

      pool.query(
        `INSERT INTO orders (user_id, order_status, total_amount, payment_method, address_id, order_date) 
         VALUES ($1, 'pending', $2, $3, $4, NOW()) RETURNING id`,
        [userId, totalAmount, paymentMethod, addressId], 
        (err, orderResult) => {
          if (err) {
            return pool.query("ROLLBACK", () => reject(err));
          }
          const orderId = orderResult.rows[0].id;

          pool.query(
            `DELETE FROM cart WHERE user_id = $1`,
            [userId],
            (err, clearCartResult) => {
              if (err) {
                return pool.query("ROLLBACK", () => reject(err));
              }

              pool.query("COMMIT", (err) => {
                if (err) {
                  return reject(err);
                }
                resolve({
                  orderId,
                  totalAmount,
                  clearCartResult,
                });
              });
            }
          );
        }
      );
    });
  });
};
