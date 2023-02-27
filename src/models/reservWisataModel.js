const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservWisata = new Schema({
  wisataID: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "wisataPacket",
  },
});

module.exports = mongoose.model("reservWisata", ReservWisata);
