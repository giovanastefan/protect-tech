const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/addressController');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/', authenticateJWT, AddressController.getAddresses);
router.get('/:id', authenticateJWT, AddressController.getAddressById);
router.post('/', authenticateJWT, AddressController.createAddress);
router.put('/:id', authenticateJWT, AddressController.updateAddress);
router.delete('/:id', authenticateJWT, AddressController.deleteAddress);

module.exports = router;