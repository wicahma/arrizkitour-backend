const expressAsyncHandler = require("express-async-handler");
const reservCustomWisata = require("../models/reservCustomWisata");

// ANCHOR Get All Reserv Wisata
const getAllreservCustomWisata = expressAsyncHandler(async (req, res) => {
  try {
    const allReserv = await reservCustomWisata.find();

    return res
      .status(200)
      .json({ status: "OK!", message: "Succes getting data", data: allReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Reserv Wisata
const getOnereservCustomWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const oneReserv = await reservCustomWisata.findById(id);
    if (!oneReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan.");
    }

    return res
      .status(200)
      .json({ status: "Success", message: "Data Founded!", data: oneReserv });
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

const updateReservCustomWisata = expressAsyncHandler(async (req, res) => {
  const {
      jumlahPeserta,
      tanggalReservasi,
      waktuJemput,
      lokasiAntar,
      fasilitasPilihan,
      armada,
      lokasiJemput,
      pesananTambahan,
      harga,
    } = req.body,
    newReservData = {
      jumlahPeserta: jumlahPeserta,
      tanggalReservasi: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      lokasiAntar: lokasiAntar,
      armada: armada,
      fasilitasPilihan: fasilitasPilihan,
      pesananTambahan: pesananTambahan,
      harga: harga,
    },
    { id } = req.params;

  try {
    const savedReserv = await reservCustomWisata.findByIdAndUpdate(
      id,
      newReservData,
      {
        new: true,
      }
    );

    if (!savedReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan.");
    }

    return res.status(201).json({
      status: "Updated!",
      messages: "Data succesfully updated!",
      data: savedReserv,
    });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Delete One Reserv Wisata
const deleteOnereservCustomWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReserv = await reservCustomWisata.findByIdAndDelete(id);
    
    if (!deletedReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan.");
    }

    res
      .status(200)
      .json({
        status: "Deleted!",
        messages: "Data Berhasil dihapus!",
        data: deletedReserv,
      });
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
  updateReservCustomWisata,
};
