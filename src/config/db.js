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

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB!");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected!");
});

module.exports = MongoDB;
