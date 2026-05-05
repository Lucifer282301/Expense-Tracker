const Income = require("./income.model");
const ApiError = require("../../utils/ApiError");

const createIncome = async (data, userId) => {
  const { source, amount, icon, date } = data;

  if (!source || !amount) {
    throw new ApiError("Source and amount are required", 400);
  }

  const income = await Income.create({
    userId,
    source,
    amount,
    icon,
    date,
  });

  return income;
};

const getUserIncomes = async (userId) => {
  return await Income.find({ userId }).sort({ date: -1 });
};

const removeIncome = async (id, userId) => {
  const income = await Income.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!income) {
    throw new ApiError("Income not found", 404);
  }

  return income;
};

module.exports = {
  createIncome,
  getUserIncomes,
  removeIncome,
};