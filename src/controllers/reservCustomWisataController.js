const expressAsyncHandler = require("express-async-handler");
const reservCustomWisata = require("../models/reservCustomWisata");

// ANCHOR Get All Reserv Wisata
const getAllreservCustomWisata = expressAsyncHandler(async (req, res) => {
  try {
    const allReserv = await reservCustomWisata.find();
    return res.status(200).json({ data: allReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Reserv Wisata
const getOnereservCustomWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const oneReserv = await reservCustomWisata.find(id);
    if (!oneReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan.");
    }
    return res.status(200).json({ data: oneReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Create New Reserv Wisata
const createreservCustomWisata = expressAsyncHandler(async (req, res) => {
  const {
      nama,
      email,
      nomorTelepon,
      jumlahPeserta,
      tanggalReservasi,
      waktuJemput,
      lokasiAntar,
      fasilitasPilihan,
      armada,
      lokasiJemput,
      pesananTambahan,
    } = req.body,
    newReservData = {
      namaReservant: nama,
      phoneNumber: nomorTelepon,
      email: email,
      jumlahPeserta: jumlahPeserta,
      tanggalReservasi: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      lokasiAntar: lokasiAntar,
      armada: armada,
      fasilitasPilihan: fasilitasPilihan,
      pesananTambahan: pesananTambahan,
    };

  try {
    const newReserv = new reservCustomWisata({
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
const deleteOnereservCustomWisata = expressAsyncHandler(async (req, res) => {
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
  getAllreservCustomWisata,
  getOnereservCustomWisata,
  createreservCustomWisata,
  deleteOnereservCustomWisata,
};
