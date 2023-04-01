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
  Pax: {
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
    },
    jenisPaket: [paketSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("wisata", wisataSchema);
