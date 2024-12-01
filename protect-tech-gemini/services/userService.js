const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserService = {
  getAllUsers: async () => {
    return await User.getAll();
  },

  getUserById: async (userId) => {
    return await User.getById(userId);
  },

  createUser: async (email, first_name, last_name, password) => {
    return await User.create(email, first_name, last_name, password);
  },

  updateUser: async (userId, email, first_name, last_name, password) => {
    return await User.update(userId, email, first_name, last_name, password);
  },

  deleteUser: async (userId) => {
    return await User.delete(userId);
  },

  login: async (email, password) => {
    const user = await User.getByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
    return token;
  }
};

module.exports = UserService;