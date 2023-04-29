const { validationResult } = require("express-validator");
const { deleteFile } = require("../middlewares/multer.js");
const car = require("../models/carModel.js");
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
    const allCar = await car.find().select("-__v -createdAt -updatedAt");
    res.status(200).json({ data: allCar });
  } catch {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - GET ONE CAR
const getOneCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const findOneCar = await car.findById(id);
    if (!findOneCar) res.status(404).json({ error: "Data tidak ditemukan" });
    res.status(200).json({ data: findOneCar });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - CREATE NEW CAR
const createNewCar = expressAsyncHandler(async (req, res) => {
  // const auth = getAuthenticate();
  const { nama, harga, seat } = req.body;
  console.log(req.file);

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    deleteFile(req.file.path);
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    if (!req.file) {
      res.status(400);
      throw new Error("File tidak terinput!");
    }

    // const response = await uploadImageToDrive(
    //   req.file,
    //   auth,
    //   process.env.CAR_FOLDER_ID
    // );
    // newCar.imageId = response.data.id;

    const newCar = await car.create({
      unitName: nama,
      seat: seat,
      pricePerDay: harga,
      imageId: req.file.filename,
    });

    if (!newCar._doc) {
      res.status(400);
      throw new Error("Data gagal dibuat!");
    }

    res.status(201).json({
      message: "Car Data Created!",
      data: newCar._doc,
    });
  } catch (err) {
    if (req.file) deleteFile(req.file.path);
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - UPDATE ONE CAR
const updateOneCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nama, harga, seat, status } = req.body;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const updatedCar = await car.findByIdAndUpdate(
      id,
      {
        unitName: nama,
        seat: seat,
        pricePerDay: harga,
        status: status,
      },
      {
        new: true,
      }
    );
    if (!updatedCar) {
      res.status(404);
      throw new Error("Data tidak ditemukan, update gagal!");
    }
    res.status(200).json({ data: updatedCar });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const updateImageCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  // const auth = getAuthenticate();
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    if (!req.file) {
      res.status(400);
      throw new Error("File tidak terinput!");
    }
    const findCar = await car.findById(id);
    req.file &&
      deleteFile(`${__dirname}/../../public/images/${findCar.imageId}`);

    const updatedCar = await car.findByIdAndUpdate(
      id,
      {
        imageId: req.file.filename,
      },
      {
        new: true,
      }
    );
    if (!updatedCar) {
      deleteFile(req.file.path);
      res.status(404);
      throw new Error("Data tidak ditemukan, update gagal!");
    }

    res.status(200).json({
      message: "Image Updated!",
      data: updatedCar,
    });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR - DELETE ONE CAR
const deleteOneCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    // const auth = getAuthenticate();

    const deletedCar = await car.findByIdAndDelete(id);
    if (!deletedCar) {
      res.status(404);
      throw new Error("Data tidak ditemukan, delete gagal!");
    }

    deleteFile(`${__dirname}/../../public/images/${deletedCar.imageId}`);

    // await deleteImageFromDrive(deletedCar.imageId, auth);

    res.status(200).json({ message: "Data berhasil dihapus!" });
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
  updateImageCar,
};
