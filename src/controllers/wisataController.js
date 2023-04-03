const expressAsyncHandler = require("express-async-handler");
const wisata = require("../models/wisataModel");
const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

// ANCHOR Get All Wisata
const getAllWisata = expressAsyncHandler(async (req, res) => {
  try {
    const allWisata = await wisata.find();
    res.status(200).json({ data: allWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Wisata
const getOneWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const findOneWisata = await wisata.findById(id);
    if (!findOneWisata) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    res.status(200).json({ data: findOneWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Paket Wisata + Pax 
// !(GOD DAYM THIS IS SO COOL, MONGODB IS JUST ANOTHER LEVEL OF DATABASE)

const getOnePaketWisataPax = expressAsyncHandler(async (req, res) => {
  const { id, orang } = req.params;
  const ObjectID = mongoose.Types.ObjectId(id);

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const findOnePaketWisata = await wisata.aggregate([
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
            { "jenisPaket.pax.jumlah": Number(orang) },
          ],
        },
      },
    ]);
    if (!findOnePaketWisata) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    res.status(200).json({ data: findOnePaketWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Create New Wisata
const createNewWisata = expressAsyncHandler(async (req, res) => {
  const { fasilitas, nama, paketWisata } = req.body;
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const newWisata = new wisata({
      fasilitas: fasilitas,
      namaPaket: nama,
      jenisPaket: paketWisata,
    });
    const saveWisata = await newWisata.save();

    res.status(200).json({ data: saveWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One Wisata
const updateOneWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateWisataData = { ...req.body };

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const updateWisata = await wisata.findByIdAndUpdate(id, updateWisataData, {
      new: true,
    });
    if (!updateWisata) {
      res.status(404).json({ error: "Data tidak ditemukan" });
      return;
    }
    res.status(200).json({ data: updateWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Delete One Wisata
const deleteOneWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const deletedWisata = await wisata.findByIdAndDelete(id);
    if (!deletedWisata) {
      res.status(404);
      throw new Error("Data tidak ditemukan.");
    }
    res.status(200).json({ message: "Data Berhasil dihapus!" });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR EXPORT MODULE
module.exports = {
  getAllWisata,
  getOneWisata,
  getOnePaketWisataPax,
  createNewWisata,
  updateOneWisata,
  deleteOneWisata,
};
