const mongoose = require("mongoose");
const { Schema } = mongoose;

const paketOutbondSchema = new Schema({
  fasilitas: {
    type: [String],
    required: true,
  },
  namaPaket: {
    type: String,
    required: true,
    maxlength: [100, "Nama Paket harus kurang dari 100 karakter kata!"],
  },
  minimumPerson: {
    type: Number,
    required: true,
    default: 1,
  },
  harga: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [
    {
      type: String,
      required: false,
    },
  ],
});

const outbondSchema = new Schema(
  {
    keterangan: {
      type: String,
      required: true,
      maxlength: [2000, "Keterangan harus kurang dari 2000 karakter kata!"],
    },
    namaTempat: {
      type: String,
      required: true,
      maxlength: [100, "Nama Tempat harus kurang dari 100 karakter kata!"],
    },
    status: {
      type: String,
      required: true,
      enum: ["aktif", "nonaktif"],
      default: "nonaktif",
    },
    jenisPaket: [paketOutbondSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("outbond", outbondSchema);
