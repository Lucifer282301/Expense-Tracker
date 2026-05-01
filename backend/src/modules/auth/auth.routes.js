const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("./auth.controller");

const { protect } = require("../../middleware/auth.middleware");
const authLimiter = require("../../middleware/rateLimiter");

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/getUser", protect, getUserInfo);

module.exports = router;
