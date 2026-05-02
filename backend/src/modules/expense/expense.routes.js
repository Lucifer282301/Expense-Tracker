const express = require("express");
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("./expense.controller");

const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/addExpense", protect, addExpense);
router.get("/getAllExpense", protect, getAllExpense);
router.get("/downloadExpenseExcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
