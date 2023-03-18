const { deleteFile } = require("../middlewares/multer.js");
const car = require("../models/carModel.js");
const {
  uploadImageToDrive,
  getAuthenticate,
} = require("../services/googleDriveServices.js");
require("dotenv").config();

const getAllCar = async (req, res) => {
  try {
    const allCar = await car.find();
    res.status(200).json({ data: allCar });
  } catch {
    res.status(500).json({ error: error?.message || error });
  }
};

const getOneCar = async (req, res) => {
  const { id } = req.params;

  try {
    const findOneCar = await car.findById(id);
    if (!findOneCar) res.status(404).json({ error: "Data tidak ditemukan" });
    res.status(200).json({ data: findOneCar });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const createNewCar = async (req, res) => {
  const auth = getAuthenticate();
  const cars = { ...req.body };

  try {
    if (!req.file) {
      return res.status(400).json({ error: "File tidak terinput" });
    }

    const response = await uploadImageToDrive(
      req.file,
      auth,
      process.env.CAR_FOLDER_ID
    );
    cars.gambar = response.data.id;
    deleteFile(req.file.path);

    const savedCar = await car.create({
      unitName: cars.unitName,
      seat: cars.seat,
      pricePerDay: cars.pricePerDay,
      gambar: cars.gambar,
    });
    res.status(201).json({ data: savedCar });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const updateOneCar = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCar = await car.findByIdAndUpdate(id, {
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
  const { id } = req.params;

  try {
    const deletedCar = await car.findByIdAndDelete(id);
    if (!deletedCar)
      return res.status(404).json({ error: "Data tidak ditemukan." });
    res.json("Data Berhasil dihapus.");
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

module.exports = {
  getAllCar,
  getOneCar,
  createNewCar,
  updateOneCar,
  deleteOneCar,
};
