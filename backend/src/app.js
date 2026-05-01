require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const ENV = require("./utils/env");

const authRoutes = require("./modules/auth/auth.routes");
const errorHandler = require("./middleware/error.middleware");

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

// global error handler
app.use(errorHandler);

module.exports = app;
