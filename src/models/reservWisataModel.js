const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservWisataSchema = new Schema({
  wisataID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "paketWisata",
  },
  namaResevant: {
    type: String,
    required: true,
    maxlength: 50,
  },
  phoneNumber: {
    type: Number,
    required: true,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    maxlength: 30,
  },
  jumlahPeserta: {
    type: Number,
    required: true,
    max: 1000,
  },
  tanggalMulai: {
    type: Date,
    required: true,
  },
  waktuJemput: {
    type: Date,
    required: true,
  },
  lokasiJemput: {
    type: String,
    required: true,
    maxlength: 300,
  },
  pesananTambahan: {
    type: String,
    required: false,
    maxlength: 300,
  },
});

module.exports = mongoose.model("reservWisata", ReservWisataSchema);
