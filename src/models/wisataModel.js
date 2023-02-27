const mongoose = require("mongoose");
const { Schema } = mongoose;

const wisataSchema = new Schema({
  fasilitas: {
    type: Array,
    required: true,
  },
  jenisPaket: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("wisataPacket", wisataSchema);
