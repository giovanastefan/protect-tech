const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);

router.get("/orders/:id", orderController.getOrderById);

router.put("/update/:id", orderController.updateOrder);

router.get("/:id", orderController.getOrderById);

router.get("/user/:userId", orderController.getAllOrdersByUserId);

module.exports = router;
