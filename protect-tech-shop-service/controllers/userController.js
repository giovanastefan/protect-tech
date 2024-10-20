const userModel = require("../models/userModel");

exports.register = (req, res) => {
  const { email, password, fname, lname } = req.body;

  if (!email || !password || !fname || !lname) {
    return res.status(400).send("Please provide all required fields.");
  }

  userModel
    .register(email, password, fname, lname)
    .then((result) => {
      console.log("User registered successfully:", result);
      res.status(201).send({
        message: "User registered successfully",
        user: result,
      });
    })
    .catch((err) => {
      console.error(err.message);
      if (err.message === "User already exists") {
        return res.status(409).send("User already exists.");
      }
      res.status(500).send("Error registering user.");
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please provide email and password.");
  }

  userModel
    .login(email, password)
    .then((result) => {
      res.status(200).send({
        message: "Login successful",
        user: result,
      });
    })
    .catch((err) => {
      console.error(err.message);
      if (err.message === "Invalid email or password") {
        return res.status(401).send("Invalid email or password.");
      }
      res.status(500).send("Error logging in.");
    });
};

exports.getUserDetails = (req, res) => {
  const { id: userId } = req.params;

  userModel
    .getUserDetails(userId)
    .then((result) => {
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error to find user.");
    });
};

exports.registerAddress = (req, res) => {
  const { userId, street, number, neighborhood, city, state } = req.body;

  if (!userId || !street || !number || !neighborhood || !city || !state) {
    return res.status(400).send("Please provide all required address fields.");
  }

  userModel
    .registerAddress(userId, street, number, neighborhood, city, state)
    .then((result) => {
      console.log("Address registered successfully:", result);
      res.status(201).send({
        message: "Address registered successfully",
        address: result,
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error registering address.");
    });
};
