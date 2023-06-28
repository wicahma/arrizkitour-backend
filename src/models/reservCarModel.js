const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservCarSchema = new Schema(
  {
    namaReservant: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      maxlength: 30,
    },
    tanggalReservasi: {
      type: Date,
      required: true,
    },
    waktuAntar: {
      type: String,
      required: true,
    },
    lokasiAntar: {
      type: String,
      required: true,
      maxlength: 300,
    },
    unitId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "car",
    },
    pesananTambahan: {
      type: String,
      required: false,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reservCar", ReservCarSchema);
