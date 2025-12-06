require("dotenv").config();

const ENV = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGO_URL,
  CLIENT_URL: process.env.CLIENT_URL,
};

module.exports = ENV;
