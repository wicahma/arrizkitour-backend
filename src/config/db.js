const mongoose = require("mongoose");
require("dotenv").config();

const MongoDB = async () => {
  try {
    const connect = await mongoose
      .set("strictQuery", false)
      .connect(process.env.MONGO_URI);
    console.log(`Database Connected on ${connect.connection.host}`);
  } catch (error) {
    console.log("Connection error", error);
  }
};

module.exports = MongoDB;
