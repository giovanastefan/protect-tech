const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authenticateJWT = require('../middleware/authMiddleware'); 

router.get('/search', ProductController.searchProducts);
router.get('/order', ProductController.orderProducts);

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', authenticateJWT, ProductController.createProduct); 
router.put('/:id', authenticateJWT, ProductController.updateProduct); 
router.delete('/:id', authenticateJWT, ProductController.deleteProduct); 

module.exports = router;