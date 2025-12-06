const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (candidate, hashed) => {
  return await bcrypt.compare(candidate, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
