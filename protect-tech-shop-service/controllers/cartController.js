const cartModel = require("../models/cartModel");

exports.getShoppingCart = (req, res) => {
    const userId = req.params.userId;
    cartModel
      .getShoppingCart(userId)
      .then((result) => {
        if (result.length > 0) {
          const formattedResult = result.map(item => ({
            name: item.name,
            productId: item.product_id,
            price: item.price,
            promotionalPrice: item.promotional_price,
            quantity: item.quantity,
            imageUrl: item.image_url
          }));
  
          res.status(200).json(formattedResult);
        } else {
          res.status(404).send("Shopping cart is empty.");
        }
      })
      .catch((err) => {
        console.error("Error fetching shopping cart:", err.message);
        res.status(500).send("Error fetching shopping cart.");
      });
  };
  

exports.addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;
  cartModel
    .addToCart(userId, productId, quantity)
    .then(() => {
      res.status(200).send("Product added to cart successfully.");
    })
    .catch((err) => {
      console.error("Error adding product to cart:", err.message);
      res.status(500).send("Error adding product to cart.");
    });
};

exports.removeFromCart = (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  cartModel
    .removeFromCart(productId, userId)
    .then((result) => {
      if (result.rowCount > 0) {
        res.status(200).send("Product removed from cart successfully.");
      } else {
        res.status(404).send("Product not found in cart.");
      }
    })
    .catch((err) => {
      console.error("Error removing product from cart:", err.message);
      res.status(500).send("Error removing product from cart.");
    });
};

exports.buy = (req, res) => {
  const userId = req.params.userId;
  const { addressId, paymentMethod, totalAmount } = req.body;

  cartModel
    .buy(userId, addressId, paymentMethod, totalAmount)
    .then(() => {
      res.status(200).send("Purchase completed successfully.");
    })
    .catch((err) => {
      console.error("Error processing the purchase:", err.message);
      res.status(500).send("Error processing the purchase.");
    });
};
