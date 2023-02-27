const reservWisata = require("../models/reservWisataModel");

const getAllReservWisata = (req, res) => {
  const reservasi = reservWisata
    .find()
    .populate({
      path: "wisataID",
    })
    .then((result) => {
      res.status(200).json(result);
    });
};

const getOneReservWisata = (req, res) => {
  res.send("Get One Wisata");
};

const createReservWisata = (req, res) => {
  const reservasi = reservWisata.create({
    wisataID: req.body.wisataID,
  });

  reservasi.then((result) => {
    res.status(201).json(result);
  });
};

const updateOneReservWisata = (req, res) => {
  res.send("Get One Wisata");
};

const deleteOneReservWisata = (req, res) => {
  res.send("Get One Wisata");
};

module.exports = {
  getAllReservWisata,
  getOneReservWisata,
  createReservWisata,
  updateOneReservWisata,
  deleteOneReservWisata,
};
