const express = require("express");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("./income.controller");

const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/addIncome", protect, addIncome);
router.get("/getAllIncome", protect, getAllIncome);
router.get("/downloadIncomeExcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
