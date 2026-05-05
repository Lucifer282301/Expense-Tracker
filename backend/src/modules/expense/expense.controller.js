const expenseService = require("./expense.service");
const ExcelJS = require("exceljs");

// ➕ Add Expense
const addExpense = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const expense = await expenseService.createExpense(req.body, userId);

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expense,
    });
  } catch (err) {
    next(err);
  }
};

// 📥 Get All Expenses
const getAllExpense = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const expenses = await expenseService.getUserExpenses(userId);

    res.json({
      success: true,
      count: expenses.length,
      expenses,
    });
  } catch (err) {
    next(err);
  }
};

// ❌ Delete Expense
const deleteExpense = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await expenseService.removeExpense(req.params.id, userId);

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// 📊 Download Excel
const downloadExpenseExcel = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const expenses = await expenseService.getUserExpenses(userId);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expenses");

    worksheet.columns = [
      { header: "Category", key: "category", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];

    expenses.forEach((item) => {
      worksheet.addRow({
        category: item.category,
        amount: item.amount,
        date: item.date.toISOString().split("T")[0],
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
};
