require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const ENV = require("./utils/env");

const authRoutes = require("./modules/auth/auth.routes");
const errorHandler = require("./middleware/error.middleware");
const incomeRoutes = require("./modules/income/income.routes");
const expenseRoutes = require("./modules/expense/expense.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");

const app = express();

app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/api/v1/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// global error handler
app.use(errorHandler);

module.exports = app;
