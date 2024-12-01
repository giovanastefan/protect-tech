const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);

router.get("/orders/:id", orderController.getOrderById);

router.put("/update/:id", orderController.updateOrder);

router.get("/:userId", orderController.getAllOrdersByUserId);

module.exports = router;
