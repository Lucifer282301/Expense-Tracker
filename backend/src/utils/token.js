const jwt = require("jsonwebtoken");
const ENV = require("./env");

const generateAccessToken = (id) => {
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }
  return jwt.sign({ id }, ENV.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (id) => {
  if (!ENV.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is missing");
  }
  return jwt.sign({ id }, ENV.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
