const { model } = require("mongoose");
const reservCar = require("../models/reservCarModel");

// ANCHOR Get All Reserv Car
const getAllReservCar = async (req, res) => {
  try {
    const allReserv = await reservCar.find().populate({
      path: "unitId",
    });
    res.status(200).json({ data: allReserv });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

// ANCHOR Get One Reserv Car
const getOneReservCar = async (req, res) => {
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
    res.status(500).json({ error: err?.message || err });
  }
};

// ANCHOR Create New Reserv Car
const createNewReservCar = async (req, res) => {
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
      tanggalMulai: tanggalReservasi,
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
    res.status(500).json({ error: err?.message || err });
  }
};

// ANCHOR Delete One Reserv Car
const deleteOneReservCar = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReserv = await reservCar.findByIdAndDelete(id);
    if (!deletedReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    res.json("Data Berhasil dihapus.");
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

// ANCHOR EXPORT MODULE
module.exports = {
  getAllReservCar,
  getOneReservCar,
  createNewReservCar,
  deleteOneReservCar,
};
