const { validationResult } = require("express-validator");
const { deleteFile } = require("../middlewares/multer.js");
const rentalCar = require("../models/carModel.js");
const {
  uploadImageToDrive,
  deleteImageFromDrive,
  getAuthenticate,
} = require("../services/googleDriveServices.js");
const expressAsyncHandler = require("express-async-handler");
require("dotenv").config();

// ANCHOR - GET ALL CAR
const getAllCar = expressAsyncHandler(async (req, res) => {
  try {
    const allCar = await rentalCar.find();
    res.status(200).json({ data: allCar });
  } catch {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - GET ONE CAR
const getOneCar = expressAsyncHandler(async (req, res) => {
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }
  const { id } = req.params;

  try {
    const findOneCar = await rentalCar.findById(id);
    if (!findOneCar) res.status(404).json({ error: "Data tidak ditemukan" });
    res.status(200).json({ data: findOneCar });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - CREATE NEW CAR
const createNewCar = expressAsyncHandler(async (req, res) => {
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
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - UPDATE ONE CAR
const updateOneCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateCarData = { ...req.body };

  try {
    const updatedCar = await rentalCar.findByIdAndUpdate(id, updateCarData, {
      new: true,
    });
    if (!updatedCar) res.status(404).json({ error: "Data tidak ditemukan" });
    res.status(200).json({ data: updatedCar });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - DELETE ONE CAR
const deleteOneCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const auth = getAuthenticate();

    const deletedCar = await rentalCar.findByIdAndDelete(id);
    if (!deletedCar)
      return res.status(404).json({ error: "Data tidak ditemukan." });
    await deleteImageFromDrive(deletedCar.imageId, auth);

    res.json("Data Berhasil dihapus.");
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - EXPORT MODULE
module.exports = {
  getAllCar,
  getOneCar,
  createNewCar,
  updateOneCar,
  deleteOneCar,
};
