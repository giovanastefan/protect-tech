const AddressService = require('../services/addressService');

const AddressController = {
  getAddresses: async (req, res) => {
    const userId = req.user.user_id; 
    try {
      const addresses = await AddressService.getAddressesByUserId(userId);
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAddressById: async (req, res) => {
    const addressId = parseInt(req.params.id);
    try {
      const address = await AddressService.getAddressById(addressId);
      if (!address) {
        return res.status(404).json({ error: 'Endereço não encontrado' });
      }
      res.json(address);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAddress: async (req, res) => {
    const userId = req.user.user_id; 
    const { street, number, neighborhood, city, state } = req.body;
    try {
      const newAddress = await AddressService.createAddress(userId, street, number, neighborhood, city, state);
      res.status(201).json(newAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateAddress: async (req, res) => {
    const addressId = parseInt(req.params.id);
    const { street, number, neighborhood, city, state } = req.body;
    try {
      const updatedAddress = await AddressService.updateAddress(addressId, street, number, neighborhood, city, state);
      if (!updatedAddress) {
        return res.status(404).json({ error: 'Endereço não encontrado' });
      }
      res.json(updatedAddress);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteAddress: async (req, res) => {
    const addressId = parseInt(req.params.id);
    try {
      const deleted = await AddressService.deleteAddress(addressId);
      if (!deleted) {
        return res.status(404).json({ error: 'Endereço não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AddressController;