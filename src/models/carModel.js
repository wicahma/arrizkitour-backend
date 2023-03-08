const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    unitName: {
      type: String,
      required: true,
      maxlength: 100,
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

module.exports = mongoose.model("rentalCar", carSchema);
