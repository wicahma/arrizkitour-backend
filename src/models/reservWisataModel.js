const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservWisataSchema = new Schema(
  {
    jenisWisata: {
      type: String,
      required: true,
      enum: ["outbond", "wisata"],
    },
    paketWisataId: {
      type: mongoose.Types.ObjectId,
      required: true,
      refPath: "jenisWisata",
    },
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
    tanggalMulai: {
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
    pesananTambahan: {
      type: String,
      required: false,
      maxlength: 300,
    },
    harga: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reservWisata", ReservWisataSchema);
