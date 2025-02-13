require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

function connectDB() {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the Database successfully");
    })
    .catch((error) => {
      console.log("Error connecting to the database");
    });
}

module.exports = connectDB;
