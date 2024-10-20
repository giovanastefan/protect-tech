const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);

router.get("/getProductsByOrder/:id", orderController.getProductsByOrder);

router.put("/update/:id", orderController.updateOrder);

router.get("/:userId", orderController.getAllOrdersByUserId);

router.get("/orders/:id", orderController.getOrderById);

module.exports = router;
