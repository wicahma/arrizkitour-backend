const { deleteFile } = require("../middlewares/multer.js");
const rentalCar = require("../models/carModel.js");
const {
  uploadImageToDrive,
  deleteImageFromDrive,
  getAuthenticate,
} = require("../services/googleDriveServices.js");
require("dotenv").config();

const getAllCar = async (req, res) => {
  try {
    const allCar = await rentalCar.find();
    res.status(200).json({ data: allCar });
  } catch {
    res.status(500).json({ error: error?.message || error });
  }
};

const getOneCar = async (req, res) => {
  const { id } = req.params;

  try {
    const findOneCar = await rentalCar.findById(id);
    if (!findOneCar) res.status(404).json({ error: "Data tidak ditemukan" });
    res.status(200).json({ data: findOneCar });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const createNewCar = async (req, res) => {
  const auth = getAuthenticate();
  const newRentalCar = { ...req.body };

  try {
    if (!req.file) {
      return res.status(400).json({ error: "File tidak terinput" });
    }

    const response = await uploadImageToDrive(
      req.file,
      auth,
      process.env.CAR_FOLDER_ID
    );
    newRentalCar.imageId = response.data.id;
    deleteFile(req.file.path);

    const rentalCarData = new rentalCar({
      ...newRentalCar,
    });
    const saveRentalCar = await rentalCarData.save();
    res.status(201).json({ data: saveRentalCar });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const updateOneCar = async (req, res) => {
  const { id } = req.params;
  const updateCarData = { ...req.body };

  try {
    const updatedCar = await rentalCar.findByIdAndUpdate(id, updateCarData, {
      new: true,
    });
    if (!updatedCar) res.status(404).json({ error: "Data tidak ditemukan" });
    res.status(200).json({ data: updatedCar });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json({ error: error?.message || error });
  }
};

const deleteOneCar = async (req, res) => {
  const { id } = req.params;

  try {
    const auth = getAuthenticate();

    const deletedCar = await rentalCar.findByIdAndDelete(id);
    if (!deletedCar)
      return res.status(404).json({ error: "Data tidak ditemukan." });
    await deleteImageFromDrive(deletedCar.imageId, auth);

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
