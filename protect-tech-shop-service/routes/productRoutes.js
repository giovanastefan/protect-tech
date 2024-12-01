const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);

router.get("/search", productController.searchProducts);

router.post("/create", productController.createProduct);

router.post("/update/:id", productController.updateProduct);

router.get("/:id", productController.getProductDetailsById);

router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
