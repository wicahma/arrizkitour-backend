const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    unitName: {
      type: String,
      required: [true, "unitName tidak boleh kosong!"],
      maxlength: 100,
    },
    seat: {
      type: Number,
      required: [true, "Seat tidak boleh kosong!"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "pricePerDay tidak boleh kosong!"],
    },
    fasilitas: {
      type: String,
      required: [true, "Fasilitas tidak boleh kosong!"],
    },
    imageId: {
      type: String,
      required: [true, "Gambar tidak boleh kosong!"],
    },
    status: {
      type: String,
      required: true,
      enum: ["aktif", "nonaktif"],
      default: "nonaktif",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("car", carSchema);
