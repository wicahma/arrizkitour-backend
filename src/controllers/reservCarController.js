const { model } = require("mongoose");
const reservCar = require("../models/reservCarModel");
const expressAsyncHandler = require("express-async-handler");

// ANCHOR Get All Reserv Car
const getAllReservCar = expressAsyncHandler(async (req, res) => {
  try {
    const allReserv = await reservCar.find().populate({
      path: "unitId",
    });
    res.status(200).json({ data: allReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Reserv Car
const getOneReservCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const oneReserv = await reservCar.findById(id).populate({
      path: "unitId",
    });
    if (!oneReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    res.status(200).json({ data: oneReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Create New Reserv Car
const createNewReservCar = expressAsyncHandler(async (req, res) => {
  const {
      nama,
      email,
      nomorTelepon,
      jenisMobil,
      tanggalReservasi,
      waktuAntar,
      lokasiAntar,
      pesananTambahan,
    } = req.body,
    newReservData = {
      namaReservant: nama,
      phoneNumber: nomorTelepon,
      email: email,
      unitId: jenisMobil,
      tanggalReservasi: tanggalReservasi,
      waktuAntar: waktuAntar,
      lokasiAntar: lokasiAntar,
      pesananTambahan: pesananTambahan,
    };

  try {
    const newReserv = new reservCar({
      ...newReservData,
    });

    const savedReserv = await newReserv.save();
    res.status(201).json({ data: savedReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One Reserv Car
const updateOneReservCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { tanggalReservasi, waktuAntar, lokasiAntar, pesananTambahan } =
    req.body;

  try {
    const updatedReserv = await reservCar.findByIdAndUpdate(id, {
      tanggalReservasi: tanggalReservasi,
      waktuAntar: waktuAntar,
      lokasiAntar: lokasiAntar,
      pesananTambahan: pesananTambahan,
    });

    if (!updatedReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan.");
    }

    res.status(200).json({ message: "Data Berhasil diupdate" });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Delete One Reserv Car
const deleteOneReservCar = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReserv = await reservCar.findByIdAndDelete(id);
    if (!deletedReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    res
      .status(200)
      .json({ message: "Data Berhasil dihapus", data: deletedReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR EXPORT MODULE
module.exports = {
  getAllReservCar,
  getOneReservCar,
  createNewReservCar,
  updateOneReservCar,
  deleteOneReservCar,
};
