const mongoose = require("mongoose");
const { Schema } = mongoose;

const paxSchema = new Schema(
  {
    jumlah: {
      type: Number,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const paketSchema = new Schema({
  rundown: {
    type: [String],
    required: true,
  },
  tempatWisata: {
    type: [String],
    required: true,
  },
  pax: {
    type: [paxSchema],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const wisataSchema = new Schema(
  {
    fasilitas: {
      type: Array,  
      required: true,
    },
    namaPaket: {
      type: String,
      required: true,
      maxlength: [100, "Nama Paket harus kurang dari 100 karakter kata!"],
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
