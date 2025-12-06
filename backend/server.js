require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const ENV = require("./src/utils/env");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(
  cors({
    origin: ENV.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Connect to Database
connectDB();

//Route Handlers
app.use("/api/v1/auth", authRoutes);

// Start Server
const PORT = ENV.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
