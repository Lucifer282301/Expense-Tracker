const User = require("./auth.model");
const { hashPassword, comparePassword } = require("../../utils/hash");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const ApiError = require("../../utils/ApiError");

const register = async ({ fullName, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError("Email already exists", 400);
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    fullName,
    email,
    password: hashed,
  });

  return {
    user,
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id),
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError("Invalid credentials", 400);
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError("Invalid credentials", 400);
  }

  return {
    user,
    accessToken: generateAccessToken(user._id),
    refreshToken: generateRefreshToken(user._id),
  };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  return user;
};

module.exports = {
  register,
  login,
  getUserProfile,
};
