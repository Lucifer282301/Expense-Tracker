const express = require("express");
const { getDashboard } = require("./dashboard.controller");
const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.get("/", protect, getDashboard);

module.exports = router;
