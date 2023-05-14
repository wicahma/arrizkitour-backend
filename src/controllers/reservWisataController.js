const expressAsyncHandler = require("express-async-handler");
const reservWisataModel = require("../models/reservWisataModel");

// ANCHOR Get All Reserv Wisata
const getAllReservWisata = expressAsyncHandler(async (req, res) => {
  try {
    const allReserv = await reservWisataModel.find();
    return res.status(200).json({ data: allReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Reserv Wisata
const getOneReservWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const oneReserv = await reservWisata.find(id).populate({
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
const createReservWisata = expressAsyncHandler(async (req, res) => {
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
    const newReserv = new reservWisata({
      ...newReservData,
    });
    const savedReserv = await newReserv.save();

    return res.status(201).json({ data: savedReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Delete One Reserv Wisata
const deleteOneReservWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReserv = await reservCar.findByIdAndDelete(id);
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

// ANCHOR EXPORT MODULE
module.exports = {
  getAllReservWisata,
  getOneReservWisata,
  createReservWisata,
  deleteOneReservWisata,
};
