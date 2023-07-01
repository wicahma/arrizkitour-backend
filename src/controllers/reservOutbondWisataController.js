const expressAsyncHandler = require("express-async-handler");
const reservWisataModel = require("../models/reservWisataModel");
const { default: mongoose } = require("mongoose");
const wisataOutbond = require("../models/wisataOutbond");
const { sendEmail, tanggal, rupiah } = require("../services/mailService");

// ANCHOR Get All Reserv Wisata Outbond
const getAllReservWisataOutbond = expressAsyncHandler(async (req, res) => {
  try {
    const allReserv = await reservWisataModel.find({ jenisWisata: "outbond" });
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
    const oneReserv = await reservWisataModel.findById(id);

    if (!oneReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const Outbond = await wisataOutbond.findOne({
      "jenisPaket._id": mongoose.Types.ObjectId(oneReserv.paketWisataId),
    });

    if (Outbond === null) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const paket = Outbond.jenisPaket.filter(
      (item) => item._id.toString() === oneReserv.paketWisataId.toString()
    );

    Outbond.jenisPaket = paket[0];
    oneReserv.paketWisataId = Outbond;

    return res.status(200).json({
      data: {
        ...oneReserv._doc,
        paketWisataId: {
          _id: oneReserv._doc.paketWisataId._id,
          namaTempat: oneReserv._doc.paketWisataId.namaTempat,
          jenisPaket: {
            ...paket[0]._doc,
            fasilitas: paket[0]._doc.fasilitas.toString(),
          },
        },
      },
    });
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
  } = req.body;

  try {
    const ObjectID = mongoose.Types.ObjectId(paketID);

    const paketWisata = await wisataOutbond.aggregate([
      {
        $unwind: {
          path: "$jenisPaket",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "jenisPaket._id": ObjectID,
        },
      },
    ]);

    if (paketWisata.length === 0) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }

    const totalHarga = paketWisata[0].jenisPaket.harga * jumlahPeserta;

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
      jenisWisata: "outbond",
      harga: totalHarga,
    };

    const newReserv = new reservWisataModel({
      ...newReservData,
    });

    const savedReserv = await newReserv.save();
    const mailers = await sendEmail({
      email: savedReserv.email,
      data: {
        ...savedReserv._doc,
        tanggalMulai: tanggal(savedReserv._doc.tanggalMulai),
        harga: rupiah(savedReserv._doc.harga),
        paketWisataId: {
          _id: paketID,
          namaTempat: paketWisata[0].namaTempat,
          jenisPaket: {
            ...paketWisata[0].jenisPaket,
            fasilitas: paketWisata[0].jenisPaket.fasilitas.toString(),
          },
        },
      },
      identifier: "Outbond",
      type: "orders",
    });
    return res.status(201).json({
      data: {
        ...savedReserv._doc,
        paketWisataId: {
          _id: paketID,
          namaTempat: paketWisata[0].namaTempat,
          jenisPaket: {
            ...paketWisata[0].jenisPaket,
            fasilitas: paketWisata[0].jenisPaket.fasilitas.toString(),
          },
        },
      },
      mailer: mailers,
    });
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
      res.status(404);
      throw new Error("Data tidak ditemukan!");
    }
    res.status(200).json({
      statue: "Deleted!",
      message: "Data Berhasil dihapus.",
      data: deletedReserv,
    });
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
  } = req.body;

  try {
    const isReservOutbondExist = await reservWisataModel.findById(id);

    if (!isReservOutbondExist) {
      res.status(404);
      throw new Error("Data tidak ditemukan!");
    }

    const hargaPerOrang =
      Number(isReservOutbondExist.harga) /
      Number(isReservOutbondExist.jumlahPeserta);

    const reservData = {
      jumlahPeserta: jumlahPeserta,
      tanggalMulai: tanggalReservasi,
      lokasiJemput: lokasiJemput,
      waktuJemput: waktuJemput,
      pesananTambahan: pesananTambahan,
      harga: hargaPerOrang * Number(jumlahPeserta),
    };

    const updatedReserv = await reservWisataModel.findByIdAndUpdate(
      id,
      reservData,
      {
        new: true,
      }
    );

    const ObjectID = mongoose.Types.ObjectId(updatedReserv.paketWisataId);

    const paketWisata = await wisataOutbond.aggregate([
      {
        $unwind: {
          path: "$jenisPaket",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "jenisPaket._id": ObjectID,
        },
      },
    ]);

    const email = await sendEmail({
      email: updatedReserv.email,
      data: {
        ...updatedReserv._doc,
        tanggalMulai: tanggal(updatedReserv._doc.tanggalMulai),
        harga: rupiah(updatedReserv._doc.harga),
        paketWisataId: {
          _id: updatedReserv.paketWisataId,
          namaTempat: paketWisata[0].namaTempat,
          jenisPaket: {
            ...paketWisata[0].jenisPaket,
            fasilitas: paketWisata[0].jenisPaket.fasilitas.toString(),
          },
        },
      },
      identifier: "Outbond",
      type: "orders",
    });

    if (!updatedReserv) {
      return res.status(404).json({ error: "Data tidak ditemukan." });
    }

    return res.status(200).json({
      status: "Updated!",
      message: "Data succesfully updated!",
      data: updatedReserv,
      mailer: email,
    });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const sendInvoice = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const reserv = await reservWisataModel.findById(id);
    if (!reserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan!");
    }
    const ObjectID = mongoose.Types.ObjectId(reserv.paketWisataId);

    const paketWisata = await wisataOutbond.aggregate([
      {
        $unwind: {
          path: "$jenisPaket",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "jenisPaket._id": ObjectID,
        },
      },
    ]);
    const email = await sendEmail({
      email: reserv.email,
      data: {
        ...reserv._doc,
        tanggalMulai: tanggal(reserv._doc.tanggalMulai),
        harga: rupiah(reserv._doc.harga),
        paketWisataId: {
          _id: reserv.paketWisataId,
          namaTempat: paketWisata[0].namaTempat,
          jenisPaket: {
            ...paketWisata[0].jenisPaket,
            fasilitas: paketWisata[0].jenisPaket.fasilitas.toString(),
          },
        },
      },
      identifier: "Outbond",
      type: "invoices",
    });
    return res.status(200).json({
      status: "Success",
      message: "Invoice berhasil dikirim",
      data: reserv,
      mailer: email,
    });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR EXPORT MODULE
module.exports = {
  sendInvoice,
  createReservWisataOutbond,
  deleteOneReservWisataOutbond,
  getAllReservWisataOutbond,
  getOneReservWisataOutbond,
  updateOneReservWisataOutbond,
};
