const expressAsyncHandler = require("express-async-handler");
const wisata = require("../models/wisataModel");
const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { deleteFile } = require("../middlewares/multer");

// ANCHOR Get All Wisata
const getAllWisata = expressAsyncHandler(async (req, res) => {
  try {
    const allWisata = await wisata.aggregate([
      { $unwind: { path: "$jenisPaket", includeArrayIndex: "string" } },
      { $unwind: { path: "$jenisPaket.pax", includeArrayIndex: "string" } },
      {
        $group: {
          _id: "$_id",
          createdAt: { $first: "$createdAt" },
          namaPaket: { $first: "$namaPaket" },
          tempatWisata: { $first: "$jenisPaket.tempatWisata" },
          hargaMinimum: { $min: "$jenisPaket.pax.harga" },
          image: {
            $first: {
              $arrayElemAt: ["$jenisPaket.images", 0],
            },
          },
          status: { $first: "$status" },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          _id: 1,
          namaPaket: 1,
          tempatWisata: 1,
          hargaMinimum: 1,
          status: 1,
          image: { $ifNull: ["$image", "https://via.placeholder.com/150"] },
        },
      },
    ]);
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
    return res.status(200).json({ data: findOneWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Paket Wisata
const getOnePaketWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
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
        $match: {
          "jenisPaket._id": ObjectID,
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
  const { fasilitas, nama, jenisPaket } = req.body;
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
    const newWisata = await wisata.create({
      fasilitas: fasilitas,
      namaPaket: nama,
      jenisPaket: jenisPaket,
    });
    res.status(200).json({ message: "Data Created!", data: req.body });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One Wisata
const updateOneWisata = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateWisataData = {
    fasiltas: req.body.fasilitas,
    namaPaket: req.body.nama,
    jenisPaket: req.body.jenisPaket,
    status: req.body.status,
  };

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
      projection: {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    });
    if (!updateWisata) {
      res.status(404).json({ error: "Data tidak ditemukan" });
      return;
    }
    res
      .status(200)
      .json({ message: "Data succesfully updated!", data: updateWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One Wisata Paket Image's

const updateOneWisataImage = expressAsyncHandler(async (req, res) => {
  const { idPaket } = req.params;
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
    if (!req.files) {
      res.status(400);
      throw new Error("File tidak terinput!");
    }
    const findWisata = await wisata.aggregate([
      {
        $unwind: {
          path: "$jenisPaket",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "jenisPaket._id": mongoose.Types.ObjectId(idPaket),
        },
      },
    ]);

    if (findWisata.length < 1) {
      req.files.map((file) => deleteFile(file.path));
      res.status(404);
      throw new Error("Data tidak ditemukan, update gagal!");
    }

    findWisata[0].jenisPaket.images.map((image) => {
      deleteFile(`${__dirname}/../../public/images/${image}`);
    });

    const imageName = req.files.map((file) => file.filename.toString());

    const updatedWisata = await wisata.updateOne(
      {
        "jenisPaket._id": new mongoose.Types.ObjectId(idPaket),
      },
      {
        $set: {
          "jenisPaket.$.images": [...imageName],
        },
      },
      {
        new: true,
        arrayFilters: [
          { "jenisPaket._id": new mongoose.Types.ObjectId(idPaket) },
        ],
      }
    );

    if (updatedWisata.modifiedCount === 0) {
      req.files.map((file) => deleteFile(file.path));
      res.status(404);
      throw new Error("Data tidak ditemukan, update gagal!");
    }

    res.status(200).json({
      message: "Gambar berhasil diupdate!",
      data: updatedWisata,
    });
  } catch (err) {
    req.files.map((file) => deleteFile(file.path));
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
    const { jenisPaket } = deletedWisata;

    jenisPaket.map((paket) => {
      paket.images.map((image) => {
        deleteFile(`${__dirname}/../../public/images/${image}`);
      });
    });

    res
      .status(200)
      .json({ message: "Data Berhasil dihapus!", data: deletedWisata });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR EXPORT MODULE
module.exports = {
  getAllWisata,
  getOneWisata,
  getOnePaketWisata,
  getOnePaketWisataPax,
  createNewWisata,
  updateOneWisata,
  updateOneWisataImage,
  deleteOneWisata,
};
