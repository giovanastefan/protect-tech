const Address = require('../models/addressModel');

const AddressService = {
  getAddressesByUserId: async (userId) => {
    return await Address.getAll(userId);
  },

  getAddressById: async (addressId) => {
    return await Address.getById(addressId);
  },

  createAddress: async (userId, street, number, neighborhood, city, state) => {
    return await Address.create(userId, street, number, neighborhood, city, state);
  },

  updateAddress: async (addressId, street, number, neighborhood, city, state) => {
    return await Address.update(addressId, street, number, neighborhood, city, state);
  },

  deleteAddress: async (addressId) => {
    return await Address.delete(addressId);
  },
};

module.exports = AddressService;