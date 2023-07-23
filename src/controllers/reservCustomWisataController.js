const expressAsyncHandler = require("express-async-handler");
const reservCustomWisata = require("../models/reservCustomWisata");
const {
  sendEmail,
  rupiah,
  tanggal,
  tanggalWaktu,
} = require("../services/mailService");

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

const sendInvoice = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const oneReserv = await reservCustomWisata.findById(id);
    if (!oneReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    const email = await sendEmail({
      email: oneReserv.email,
      data: {
        ...oneReserv._doc,
        harga: rupiah(Number(oneReserv._doc.harga)),
        tanggalReservasi: tanggal(oneReserv._doc.tanggalReservasi),
      },
      identifier: "Custom Wisata",
      type: "invoices",
    });
    res.status(200).json({
      data: oneReserv,
      mailer: email,
      message: `Invoice berhasil dikirim ke ${oneReserv.email}`,
    });
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
      jumlahOrang,
      tanggalReservasi,
      waktuJemput,
      listWisata,
      instagram, 
      fasilitas,
      armada,
      lokasiJemput,
      pesananTambahan,
    } = req.body,
    newReservData = {
      namaReservant: nama,
      phoneNumber: nomorTelepon,
      email: email,
      instagram: instagram,
      jumlahPeserta: jumlahOrang,
      tanggalReservasi: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      listWisata: listWisata,
      armada: armada,
      fasilitasPilihan: fasilitas,
      pesananTambahan: pesananTambahan,
    };

  try {
    const newReserv = new reservCustomWisata({
      ...newReservData,
    });
    const savedReserv = await newReserv.save();
    const email = await sendEmail({
      email: savedReserv.email,
      data: {
        ...savedReserv._doc,
        harga: rupiah(Number(savedReserv._doc.harga)),
        tanggalReservasi: tanggal(savedReserv._doc.tanggalReservasi),
        createdAt: tanggalWaktu(savedReserv._doc.createdAt),
      },
      identifier: "Custom Wisata in Check",
      type: "orders",
    });
    return res.status(201).json({ data: savedReserv, mailer: email });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const updateReservCustomWisata = expressAsyncHandler(async (req, res) => {
  const {
      jumlahOrang,
      tanggalReservasi,
      waktuJemput,
      listWisata,
      fasilitas,
      armada,
      lokasiJemput,
      pesananTambahan,
      harga,
    } = req.body,
    newReservData = {
      jumlahPeserta: jumlahOrang,
      tanggalReservasi: tanggalReservasi,
      waktuJemput: waktuJemput,
      lokasiJemput: lokasiJemput,
      listWisata: listWisata,
      armada: armada,
      fasilitasPilihan: fasilitas,
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

    const email = await sendEmail({
      email: savedReserv.email,
      data: {
        ...savedReserv._doc,
        harga: rupiah(Number(savedReserv._doc.harga)),
        tanggalReservasi: tanggal(savedReserv._doc.tanggalReservasi),
      },
      identifier: "Custom Wisata",
      type: "orders",
    });

    return res.status(201).json({
      status: "Updated!",
      message: "Data succesfully updated!",
      data: savedReserv,
      mailer: email,
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

    res.status(200).json({
      status: "Deleted!",
      message: "Data Berhasil dihapus!",
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
  sendInvoice,
  createreservCustomWisata,
  deleteOnereservCustomWisata,
  updateReservCustomWisata,
};
