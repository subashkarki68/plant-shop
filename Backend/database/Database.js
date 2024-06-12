const mongoose = require("mongoose");

const connectDB = () => {
  // connect to database
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("DB CONNECTED : " + process.env.DB_URL);
  });
};

module.exports = connectDB;


