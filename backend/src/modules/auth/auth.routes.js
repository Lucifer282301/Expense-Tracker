const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("./auth.controller");

const { protect } = require("../../middleware/auth.middleware");
const authLimiter = require("../../middleware/rateLimiter");
const upload = require("../../middleware/upload.middleware");
const ENV = require("../../utils/env");

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

const BASE_URL = ENV.BASE_URL;

const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      imageUrl,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
