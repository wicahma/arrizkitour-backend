const expressAsyncHandler = require("express-async-handler");
const reservWisataModel = require("../models/reservWisataModel");

// ANCHOR Get All Reserv Wisata Outbond
const getAllReservWisataOutbond = expressAsyncHandler(async (req, res) => {
  try {
    const allReserv = await reservWisataModel.find();
    return res.status(200).json({ data: allReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Reserv Wisata Outbond
const getOneReservWisataOutbond = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const oneReserv = await reservWisataModel.find(id).populate({
      path: "wisataId",
    });
    if (!oneReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    return res.status(200).json({ data: oneReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Create New Reserv Wisata
const createReservWisataOutbond = expressAsyncHandler(async (req, res) => {
  const {
      nama,
      email,
      nomorTelepon,
      paketID,
      jumlahPeserta,
      tanggalReservasi,
      waktuJemput,
      lokasiJemput,
      pesananTambahan,
    } = req.body,
    newReservData = {
      namaReservant: nama,
      phoneNumber: nomorTelepon,
      email: email,
      paketWisataId: paketID,
      jumlahPeserta: jumlahPeserta,
      tanggalMulai: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      pesananTambahan: pesananTambahan,
    };

  try {
    const newReserv = new reservWisataModel({
      ...newReservData,
    });
    const savedReserv = await newReserv.save();

    return res.status(201).json({ data: savedReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Delete One Reserv Wisata Outbond
const deleteOneReservWisataOutbond = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReserv = await reservWisataModel.findByIdAndDelete(id);
    if (!deletedReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    res.json("Data Berhasil dihapus.");
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One Reserv Wisata Outbond
const updateOneReservWisataOutbond = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
      jumlahPeserta,
      tanggalReservasi,
      waktuJemput,
      lokasiJemput,
      pesananTambahan,
    } = req.body,
    reservData = {
      jumlahPeserta: jumlahPeserta,
      tanggalMulai: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      pesananTambahan: pesananTambahan,
    };

  try {
    const updatedReserv = await reservWisataModel.findByIdAndUpdate(
      id,
      reservData
    );

    if (!updatedReserv) {
      return res.status(404).json({ error: "Data tidak ditemukan." });
    }

    return res
      .status(200)
      .json({ message: "Data succesfully updated!", data: updatedReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR EXPORT MODULE
module.exports = {
  createReservWisataOutbond,
  deleteOneReservWisataOutbond,
  getAllReservWisataOutbond,
  getOneReservWisataOutbond,
  updateOneReservWisataOutbond,
};
