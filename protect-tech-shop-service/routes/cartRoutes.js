const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/:userId", cartController.getShoppingCart);

router.post("/add", cartController.addToCart);

router.delete("/remove/:productId/:userId", cartController.removeFromCart);

router.post("/buy/:userId", cartController.buy);

module.exports = router;