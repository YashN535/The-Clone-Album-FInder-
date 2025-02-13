const express = require("express");
const router = express.Router();
const { signup, signin, logout } = require("../Controller/authController");

// Signup Route

router.post("/signup", signup);

// Signin Route

router.post("/signin", signin);

// Logout Route

router.post("/logout", logout);

module.exports = router;
