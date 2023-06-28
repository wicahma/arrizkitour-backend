const expressAsyncHandler = require("express-async-handler");
const reservWisataModel = require("../models/reservWisataModel");
const wisataModel = require("../models/wisataModel");
const { default: mongoose } = require("mongoose");

// ANCHOR Get All Reserv Wisata
const getAllReservWisata = expressAsyncHandler(async (req, res) => {
  try {
    const allReserv = await reservWisataModel.find({ jenisWisata: "wisata" });
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
    const oneReserv = await reservWisataModel.findById(id);
    if (!oneReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const Wisata = await wisataModel.findOne({
      "jenisPaket._id": mongoose.Types.ObjectId(oneReserv.paketWisataId),
    });

    if (Wisata === null) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const paket = Wisata.jenisPaket.filter(
      (item) => item._id.toString() === oneReserv.paketWisataId.toString()
    );

    Wisata.jenisPaket = paket;
    oneReserv.paketWisataId = Wisata;

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
  } = req.body;

  try {
    const ObjectID = mongoose.Types.ObjectId(paketID);

    const paketWisata = await wisataModel.aggregate([
      {
        $unwind: {
          path: "$jenisPaket",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$jenisPaket.pax",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          $and: [
            { "jenisPaket._id": ObjectID },
            { "jenisPaket.pax.jumlah": Number(jumlahPeserta) },
          ],
        },
      },
    ]);

    if (!paketWisata) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const { jumlah, harga } = paketWisata[0].jenisPaket.pax;

    const newReservData = {
      namaReservant: nama,
      phoneNumber: nomorTelepon,
      email: email,
      paketWisataId: paketID,
      jumlahPeserta: jumlahPeserta,
      tanggalMulai: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      pesananTambahan: pesananTambahan,
      jenisWisata: "wisata",
      harga: harga * jumlah,
    };

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

// ANCHOR Delete One Reserv Wisata
const deleteOneReservWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReserv = await reservWisataModel.findByIdAndDelete(id);
    if (!deletedReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    res
      .status(200)
      .json({ message: "Data Berhasil dihapus", data: deletedReserv });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One Reserv Wisata
const updateOneReservWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    jumlahPeserta,
    tanggalReservasi,
    waktuJemput,
    lokasiJemput,
    pesananTambahan,
  } = req.body;

  try {
    const isReservExist = await reservWisataModel.findById(id);

    // const ObjectID = mongoose.Types.ObjectId(
    //   isReservExist.paketWisataId.toString()
    // );

    const paketWisata = await wisataModel.aggregate([
      {
        $unwind: {
          path: "$jenisPaket",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $unwind: {
          path: "$jenisPaket.pax",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          $and: [
            { "jenisPaket._id": isReservExist.paketWisataId },
            { "jenisPaket.pax.jumlah": Number(jumlahPeserta) },
          ],
        },
      },
    ]);

    if (!paketWisata) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const { jumlah, harga } = paketWisata[0].jenisPaket.pax;

    const reservData = {
      jumlahPeserta: jumlahPeserta,
      tanggalMulai: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      pesananTambahan: pesananTambahan,
      harga: harga * jumlah,
    };

    const updatedReserv = await reservWisataModel.findByIdAndUpdate(
      id,
      reservData,
      {
        new: true,
      }
    );

    if (!updatedReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
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
  getAllReservWisata,
  getOneReservWisata,
  createReservWisata,
  deleteOneReservWisata,
  updateOneReservWisata,
};
