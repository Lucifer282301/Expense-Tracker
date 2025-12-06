require("dotenv").config();

const ENV = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGO_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = ENV;
