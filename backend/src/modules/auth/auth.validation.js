const validator = require("validator");
const ApiError = require("../../utils/ApiError");

const validateRegister = ({ fullName, email, password }) => {
  if (!fullName || !email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  if (!validator.isEmail(email)) {
    throw new ApiError("Invalid email format", 400);
  }

  if (password.length < 6) {
    throw new ApiError("Password must be at least 6 characters", 400);
  }
};

const validateLogin = ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError("All fields are required", 400);
  }
};

module.exports = {
  validateRegister,
  validateLogin,
};
