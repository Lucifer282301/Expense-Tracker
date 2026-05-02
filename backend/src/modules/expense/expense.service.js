const Expense = require("./expense.model");
const ApiError = require("../../utils/ApiError");

const createExpense = async (data, userId) => {
  const { category, amount, icon,  date } = data;

  if (!category || !amount) {
    throw new ApiError("Category and amount are required", 400);
  }

  const expense = await Expense.create({
    userId,
    category,
    amount,
    icon,
    date,
  });

  return expense;
};

const getUserExpenses = async (userId) => {
  return await Expense.find({ userId }).sort({ date: -1 });
};

const removeExpense = async (id, userId) => {
  const expense = await Expense.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!expense) {
    throw new ApiError("Expense not found", 404);
  }

  return expense;
};

module.exports = {
  createExpense,
  getUserExpenses,
  removeExpense,
};
