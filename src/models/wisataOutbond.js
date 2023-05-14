const mongoose = require("mongoose");
const { Schema } = mongoose;

const paketSchema = new Schema({
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

const wisataSchema = new Schema(
  {
    keterangan: {
      type: Array,
      required: true,
      maxlength: [30, "Keterangan harus kurang dari 100 karakter kata!"],
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
    jenisPaket: [paketSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wisata", wisataSchema);
