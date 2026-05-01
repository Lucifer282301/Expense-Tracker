const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ENV = require("../utils/env");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    // Get user from token
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
