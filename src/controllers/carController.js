const rentalCar = require("../models/carModel.js");

const getAllCar = async (req, res) => {
  try {
    const data = await rentalCar.find();
    res.status(200).json({ data });
  } catch {
    res.status(500).json({ error: error?.message || error });
  }
};

const getOneCar = async (req, res) => {
  const { carId } = req.params;

  try {
    const findCar = await rentalCar.findById(carId);
    if (!findCar) res.status(404).json({ error: "Data tidak ditemukan" });
    res.status(200).json({ data: findCar });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const createNewCar = async (req, res) => {
  const { unitName, seat, pricePerDay } = req.body;

  // Cek Inputan
  if (!unitName || !seat || !pricePerDay)
    res.status(400).json({ error: "Salah inputan tidak ada atau kosong" });

  const newRentalCar = new rentalCar({
    unitName,
    seat,
    pricePerDay,
  });

  try {
    const savedCar = await newRentalCar.save();
    res.status(201).json({ data: savedCar });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const updateOneCar = async (req, res) => {
  const { carId } = req.params;

  try {
    const updatedCar = await rentalCar.findByIdAndUpdate(carId, {
      ...req.body,
    });

    if (!updatedCar) res.status(404).json({ error: "Data tidak ditemukan" });

    res.status(200).json({ updated: req.body });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ error: error?.message || error });
  }
};

const deleteOneCar = async (req, res) => {
  const { carId } = req.params;

  try {
    const data = await rentalCar.findByIdAndDelete(carId);
    if (!data) res.status(404).json({ error: "Data tidak ditemukan." });

    return res.json("Data Berhasil dihapus.");
  } catch (err) {
    return res.status(500).json({ error: err?.message || err });
  }
};

module.exports = {
  getAllCar,
  getOneCar,
  createNewCar,
  updateOneCar,
  deleteOneCar,
};
