const { model } = require("mongoose");
const reservCar = require("../models/reservCarModel");
const expressAsyncHandler = require("express-async-handler");
const { sendEmail, rupiah, tanggal } = require("../services/mailService");

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

const sendInvoice = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const oneReserv = await reservCar.findById(id).populate({
      path: "unitId",
    });
    if (!oneReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    const email = await sendEmail({
      email: oneReserv.email,
      data: {
        ...oneReserv._doc,
        tanggalReservasi: tanggal(oneReserv._doc.tanggalReservasi),
        unitId: {
          ...oneReserv._doc.unitId._doc,
          pricePerDay: rupiah(oneReserv._doc.unitId.pricePerDay),
        },
      },
      identifier: "Mobil",
      type: "invoices",
    });
    res.status(200).json({ data: oneReserv, mailer: email });
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
    const oneReserv = await reservCar.findById(savedReserv._id).populate({
      path: "unitId",
    });
    const email = await sendEmail({
      email: oneReserv.email,
      data: {
        ...oneReserv._doc,
        tanggalReservasi: tanggal(oneReserv._doc.tanggalReservasi),
        unitId: {
          ...oneReserv._doc.unitId._doc,
          pricePerDay: rupiah(oneReserv._doc.unitId.pricePerDay),
        },
      },
      identifier: "Mobil",
      type: "orders",
    });

    res.status(201).json({ data: savedReserv, mailer: email });
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
    const updatedReserv = await reservCar
      .findByIdAndUpdate(
        id,
        {
          tanggalReservasi: tanggalReservasi,
          waktuAntar: waktuAntar,
          lokasiAntar: lokasiAntar,
          pesananTambahan: pesananTambahan,
        },
        { new: true }
      )
      .populate({
        path: "unitId",
      });

    const email = await sendEmail({
      email: updatedReserv.email,
      data: {
        ...updatedReserv._doc,
        tanggalReservasi: tanggal(updatedReserv._doc.tanggalReservasi),
        unitId: {
          ...updatedReserv._doc.unitId._doc,
          pricePerDay: rupiah(updatedReserv._doc.unitId.pricePerDay),
        },
      },
      identifier: "Mobil",
      type: "orders",
    });

    if (!updatedReserv) {
      res.status(404);
      throw new Error("Data tidak ditemukan.");
    }

    res.status(200).json({
      message: "Data Berhasil diupdate",
      data: updatedReserv,
      mailer: email,
    });
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
  sendInvoice,
  createNewReservCar,
  updateOneReservCar,
  deleteOneReservCar,
};
