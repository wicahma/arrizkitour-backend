const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservasiMobil = new Schema({
  namaReservant: {
    type: String,
    required: true,
    maxlength: 50,
  },
  phoneNumber: {
    type: Number,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    maxlength: 30,
  },
});
