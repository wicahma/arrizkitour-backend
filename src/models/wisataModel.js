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

const paketSchema = new Schema(
  {
    rundown: {
      type: Array,
      required: true,
    },
    tempatWisata: {
      type: Array,
      required: true,
    },
    Pax: {
      type: [paxSchema],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const wisataSchema = new Schema(
  {
    fasilitas: {
      type: Array,
      required: true,
    },
    jenisPaket: paketSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("paketWisata", wisataSchema);
