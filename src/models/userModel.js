const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, "nickname tidak boleh kosong"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email tidak boleh kosong"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password tidak boleh kosong"],
  },
  role: {
    type: String,
    required: [true, "role tidak boleh kosong"],
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("user", userSchema);
