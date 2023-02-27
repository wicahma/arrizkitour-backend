const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true,
    },
    seat: {
      type: Number,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rentCar", carSchema);
