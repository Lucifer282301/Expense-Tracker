const Income = require("../income/income.model");
const Expense = require("../expense/expense.model");
const { Types } = require("mongoose");

const getDashboardData = async (userId) => {
  const userObjectId = new Types.ObjectId(String(userId));

  // 🔹 Total Income
  const totalIncomeAgg = await Income.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalIncome = totalIncomeAgg[0]?.total || 0;

  // 🔹 Total Expense
  const totalExpenseAgg = await Expense.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalExpense = totalExpenseAgg[0]?.total || 0;

  // 🔹 Last 60 days Income
  const last60DaysIncomeTransactions = await Income.find({
    userId: userObjectId,
    date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
  }).sort({ date: -1 });

  const incomeLast60Days = last60DaysIncomeTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0,
  );

  // 🔹 Last 30 days Expense
  const last30DaysExpenseTransactions = await Expense.find({
    userId: userObjectId,
    date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  }).sort({ date: -1 });

  const expenseLast30Days = last30DaysExpenseTransactions.reduce(
    (sum, txn) => sum + txn.amount,
    0,
  );

  // 🔹 Recent Transactions
  const incomes = await Income.find({ userId: userObjectId })
    .sort({ date: -1 })
    .limit(5);

  const expenses = await Expense.find({ userId: userObjectId })
    .sort({ date: -1 })
    .limit(5);

  const lastTransactions = [
    ...incomes.map((txn) => ({ ...txn.toObject(), type: "income" })),
    ...expenses.map((txn) => ({ ...txn.toObject(), type: "expense" })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return {
    totalBalance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
    last30daysExpense: {
      total: expenseLast30Days,
      transactions: last30DaysExpenseTransactions,
    },
    last60DaysIncome: {
      total: incomeLast60Days,
      transactions: last60DaysIncomeTransactions,
    },
    recentTransactions: lastTransactions,
  };
};

module.exports = {
  getDashboardData,
};
