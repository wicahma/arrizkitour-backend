const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservCustomWisataSchema = new Schema(
  {
    namaReservant: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
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
    tanggalReservasi: {
      type: Date,
      required: true,
    },
    waktuJemput: {
      type: String,
      required: true,
    },
    lokasiJemput: {
      type: String,
      required: true,
      maxlength: 300,
    },
    lokasiAntar: {
      type: String,
      required: true,
      maxlength: 300,
    },
    armada: {
      type: String,
      required: true,
      maxlength: 300,
    },
    fasilitasPilihan: {
      type: String,
      required: true,
      maxlength: 300,
    },
    harga: {
      type: String,
      required: true,
      default: 0,
      maxlength: 300,
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

module.exports = mongoose.model("reservCustomWisata", ReservCustomWisataSchema);
