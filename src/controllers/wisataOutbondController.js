const expressAsyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const { deleteFile } = require("../middlewares/multer");
const wisataOutbond = require("../models/wisataOutbond");

// ANCHOR Get All WisataOutbond
const getAllWisataOutbond = expressAsyncHandler(async (req, res) => {
  try {
    const allWisataOutbond = await wisataOutbond.aggregate([
      { $unwind: { path: "$jenisPaket", includeArrayIndex: "string" } },
      {
        $group: {
          _id: "$_id",
          createdAt: { $first: "$createdAt" },
          namaTempat: { $first: "$namaTempat" },
          keterangan: { $first: "$keterangan" },
          hargaMinimum: { $min: "$jenisPaket.harga" },
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
          namaTempat: 1,
          keterangan: 1,
          hargaMinimum: 1,
          status: 1,
          image: { $ifNull: ["$image", "https://via.placeholder.com/150"] },
        },
      },
    ]);
    res.status(200).json({ data: allWisataOutbond });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One WisataOutbond
const getOneWisataOutbond = expressAsyncHandler(async (req, res) => {
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
    const findOneWisataOutbond = await wisataOutbond.findById(id);
    if (!findOneWisataOutbond) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    return res.status(200).json({ data: findOneWisataOutbond });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Get One Paket WisataOutbond + Pax
// !(GOD DAYM THIS IS SO COOL, MONGODB IS JUST ANOTHER LEVEL OF DATABASE)

const getOnePaketWisataOutbondPax = expressAsyncHandler(async (req, res) => {
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
    const findOnePaketWisataOutbond = await wisataOutbond.aggregate([
      {
        $unwind: {
          path: "$jenisPaket",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          "jenisPaket._id": ObjectID,
          // { "jenisPaket.pax.jumlah": Number(orang) },
        },
      },
    ]);
    if (!findOnePaketWisataOutbond) {
      res.status(404);
      throw new Error("Data tidak ditemukan");
    }
    res.status(200).json({ data: findOnePaketWisataOutbond });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Create New WisataOutbond
const createNewWisataOutbond = expressAsyncHandler(async (req, res) => {
  const { keterangan, nama, jenisPaket } = req.body;
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
    await wisataOutbond
      .create({
        keterangan: keterangan,
        namaPaket: nama,
        jenisPaket: jenisPaket,
      })
      .then((data) => {
        res.status(200).json({ message: "Data Created!", data: data });
      });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One WisataOutbond
const updateOneWisataOutbond = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateWisataOutbondData = {
    keterangan: req.body.keterangan,
    namaTempat: req.body.nama,
    jenisPaket: req.body.paketWisata,
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
    const updateWisataOutbond = await wisataOutbond.findByIdAndUpdate(
      id,
      updateWisataOutbondData,
      {
        new: true,
        projection: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      }
    );
    if (!updateWisataOutbond) {
      res.status(404).json({ error: "Data tidak ditemukan" });
      return;
    }
    res.status(200).json({ data: updateWisataOutbond });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Update One WisataOutbond Paket Image's

const updateOneWisataOutbondImage = expressAsyncHandler(async (req, res) => {
  const { idPaket } = req.params;
  // const auth = getAuthenticate();
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
    const findWisataOutbond = await wisataOutbond.aggregate([
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

    if (findwisataOutbond.length < 1) {
      req.files.map((file) => deleteFile(file.path));
      res.status(404);
      throw new Error("Data tidak ditemukan, update gagal!");
    }

    findWisataOutbond[0].jenisPaket.images.map((image) => {
      deleteFile(`${__dirname}/../../public/images/${image}`);
    });

    const imageName = req.files.map((file) => file.filename.toString());

    const updatedWisataOutbond = await wisataOutbond.updateOne(
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

    if (updatedwisataOutbond.modifiedCount === 0) {
      req.files.map((file) => deleteFile(file.path));
      res.status(404);
      throw new Error("Data tidak ditemukan, update gagal!");
    }

    res.status(200).json({
      message: "Gambar berhasil diupdate!",
      data: updatedWisataOutbond,
    });
  } catch (err) {
    req.files.map((file) => deleteFile(file.path));
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

// ANCHOR Delete One WisataOutbond
const deleteOneWisataOutbond = expressAsyncHandler(async (req, res) => {
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
    const deletedWisataOutbond = await wisataOutbond.findByIdAndDelete(id);
    if (!deletedWisataOutbond) {
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
  getAllWisataOutbond,
  getOneWisataOutbond,
  getOnePaketWisataOutbondPax,
  createNewWisataOutbond,
  updateOneWisataOutbond,
  updateOneWisataOutbondImage,
  deleteOneWisataOutbond,
};
