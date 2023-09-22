const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  return mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Database connected! 😃");
    })
    .catch((error) => {
      console.log(error.message);
      console.log("🤨");
    });
};

module.exports = connectToDatabase;
