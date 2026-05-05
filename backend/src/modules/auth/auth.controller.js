const authService = require("./auth.service");
const { validateRegister, validateLogin } = require("./auth.validation");

const formatUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  profileImageUrl: user.profileImageUrl,
});

const registerUser = async (req, res, next) => {
  try {
    validateRegister(req.body);

    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      user: formatUser(result.user),
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    validateLogin(req.body);

    const result = await authService.login(req.body);

    res.json({
      success: true,
      user: formatUser(result.user),
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = await authService.getUserProfile(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
};
