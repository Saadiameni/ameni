// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/authController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
