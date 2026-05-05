const dashboardService = require("./dashboard.service");

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const data = await dashboardService.getDashboardData(userId);

    res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};
