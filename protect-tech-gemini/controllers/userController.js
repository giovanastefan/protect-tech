const UserService = require('../services/userService');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    try {
      const newUser = await UserService.createUser(email, first_name, last_name, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    const userId = parseInt(req.params.id);
    const { email, first_name, last_name, password } = req.body;
    try {
      const updatedUser = await UserService.updateUser(userId, email, first_name, last_name, password);
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
      const deleted = await UserService.deleteUser(userId);
      if (!deleted) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const token = await UserService.login(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
};

module.exports = UserController;