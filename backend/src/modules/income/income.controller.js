const incomeService = require("./income.service");
const ExcelJS = require("exceljs");

// ➕ Add Income
const addIncome = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const income = await incomeService.createIncome(req.body, userId);

    res.status(201).json({
      success: true,
      message: "Income added successfully",
      income,
    });
  } catch (err) {
    next(err);
  }
};

// 📥 Get All Income
const getAllIncome = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const incomes = await incomeService.getUserIncomes(userId);

    res.json({
      success: true,
      count: incomes.length,
      incomes,
    });
  } catch (err) {
    next(err);
  }
};

// ❌ Delete Income
const deleteIncome = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await incomeService.removeIncome(req.params.id, userId);

    res.json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

// 📊 Download Excel
const downloadIncomeExcel = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const incomes = await incomeService.getUserIncomes(userId);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Income");

    worksheet.columns = [
      { header: "Source", key: "source", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];

    incomes.forEach((inc) => {
      worksheet.addRow({
        source: inc.source,
        amount: inc.amount,
        date: inc.date.toISOString().split("T")[0],
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
};
