const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Rotas de Endereço
router.post('/', authMiddleware, addressController.createAddress);
router.get('/', authMiddleware, addressController.getAllAddresses);
router.get('/:id', authMiddleware, addressController.getAddressById);
router.put('/:id', authMiddleware, addressController.updateAddress);
router.delete('/:id', authMiddleware, addressController.deleteAddress);

module.exports = router;
