const app = require("./app");
const connectDB = require("./config/db");
const ENV = require("./utils/env");

const PORT = ENV.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
