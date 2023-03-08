const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservCarSchema = new Schema({
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
  tanggalMulai: {
    type: Date,
    required: true,
  },
  waktuJemput: {
    type: Date,
    required: true,
  },
  lokasiAntar: {
    type: String,
    required: true,
    maxlength: 300,
  },
  unitID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "rentalCar",
  },
  pesananTambahan: {
    type: String,
    required: false,
    maxlength: 300,
  },
});

module.exports = mongoose.model("reservCar", ReservCarSchema);
