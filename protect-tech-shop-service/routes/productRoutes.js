const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const verifyJWT = require("../middleware/authMiddleware");

router.get("/", productController.getAllProducts);

router.get("/search", productController.searchProducts);

router.post("/create", productController.createProduct);

router.post("/update/:id", verifyJWT, productController.updateProduct);

router.get("/:id", productController.getProductDetailsById);

router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
