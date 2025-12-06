const mongoose = require("mongoose");
const ENV = require("../utils/env");

const connectDB = async () => {
  const uri = ENV.MONGODB_URL;

  if (!uri) {
    console.error(
      "MongoDB URI is missing. Please set MONGO_URI in your .env file."
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
