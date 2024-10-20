const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/address", userController.registerAddress);

router.get("/:id", userController.getUserDetails);

module.exports = router;