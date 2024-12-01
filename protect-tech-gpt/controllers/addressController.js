const Address = require('../models/addressModel');

exports.createAddress = async (req, res) => {
  try {
    const { street, number, neighborhood, city, state } = req.body;
    const userId = req.userId;
    const address = await Address.create({ userId, street, number, neighborhood, city, state });
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAddresses = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await Address.getAll(userId);
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const address = await Address.getById(id, userId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { street, number, neighborhood, city, state } = req.body;
    const updatedAddress = await Address.update(id, userId, { street, number, neighborhood, city, state });
    if (!updatedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const deletedAddress = await Address.delete(id, userId);
    if (!deletedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
