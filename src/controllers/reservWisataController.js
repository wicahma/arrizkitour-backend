const expressAsyncHandler = require("express-async-handler");
const reservWisataModel = require("../models/reservWisataModel");
const wisataModel = require("../models/wisataModel");
const { default: mongoose } = require("mongoose");
const { tanggal, rupiah, sendEmail } = require("../services/mailService");

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

    Wisata.jenisPaket = paket[0];
    oneReserv.paketWisataId = Wisata;
    // oneReserv._doc.
    return res.status(200).json({
      data: {
        ...oneReserv._doc,
        paketWisataId: {
          _id: oneReserv._doc.paketWisataId._id,
          namaPaket: oneReserv._doc.paketWisataId.namaPaket,
          fasilitas: oneReserv._doc.paketWisataId.fasilitas,
          jenisPaket: {
            _id: paket[0]._doc._id,
            rundown: paket[0]._doc.rundown.toString(),
            tempatWisata: paket[0]._doc.tempatWisata.toString(),
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

    const emails = await sendEmail({
      email: savedReserv.email,
      data: {
        ...savedReserv._doc,
        tanggalMulai: tanggal(savedReserv._doc.tanggalMulai),
        harga: rupiah(savedReserv._doc.harga),
        paketWisataId: {
          _id: paketWisata[0]._id,
          namaPaket: paketWisata[0].namaPaket,
          fasilitas: paketWisata[0].fasilitas,
          jenisPaket: {
            rundown: paketWisata[0].jenisPaket.rundown.toString(),
            tempatWisata: paketWisata[0].jenisPaket.tempatWisata.toString(),
          },
        },
      },
      identifier: "Private Wisata",
      type: "orders",
    });

    return res.status(201).json({ data: savedReserv, mailer: emails });
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

    const email = await sendEmail({
      email: updatedReserv.email,
      data: {
        ...updatedReserv._doc,
        tanggalMulai: tanggal(updatedReserv._doc.tanggalMulai),
        harga: rupiah(updatedReserv._doc.harga),
        paketWisataId: {
          _id: paketWisata[0]._id,
          namaPaket: paketWisata[0].namaPaket,
          fasilitas: paketWisata[0].fasilitas,
          jenisPaket: {
            rundown: paketWisata[0].jenisPaket.rundown.toString(),
            tempatWisata: paketWisata[0].jenisPaket.tempatWisata.toString(),
          },
        },
      },
      identifier: "Private Wisata",
      type: "orders",
    });

    return res.status(200).json({
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
      throw new Error("Data tidak ditemukan");
    }

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
            { "jenisPaket._id": reserv.paketWisataId },
            { "jenisPaket.pax.jumlah": Number(reserv.jumlahPeserta) },
          ],
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
          _id: paketWisata[0]._id,
          namaPaket: paketWisata[0].namaPaket,
          fasilitas: paketWisata[0].fasilitas,
          jenisPaket: {
            rundown: paketWisata[0].jenisPaket.rundown.toString(),
            tempatWisata: paketWisata[0].jenisPaket.tempatWisata.toString(),
          },
        },
      },
      identifier: "Private Wisata",
      type: "invoices",
    });

    res
      .status(200)
      .json({
        message: `Invoice berhasil dikirim ke ${reserv.email}`,
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
  getAllReservWisata,
  getOneReservWisata,
  createReservWisata,
  deleteOneReservWisata,
  updateOneReservWisata,
};
