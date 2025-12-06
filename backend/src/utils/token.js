const jwt = require("jsonwebtoken");
const ENV = require("./env");

const createToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  createToken,
};
