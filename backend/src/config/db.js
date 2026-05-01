const mongoose = require("mongoose");
const ENV = require("../utils/env");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
