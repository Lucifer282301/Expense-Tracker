require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const ENV = require("./src/utils/env");
const connectDB = require("./src/config/db");

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: ENV.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//Connect to Database
connectDB();

// Start Server
const PORT = ENV.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
