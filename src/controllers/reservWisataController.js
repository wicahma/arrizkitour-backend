const reservWisata = require("../models/reservWisataModel");

const getAllReservWisata = async (req, res) => {
  try {
    const allReserv = reservWisata.find().populate({
      path: "wisataId",
    });
    return res.status(200).json({ data: allReserv });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const getOneReservWisata = async (req, res) => {
  const { wisataId } = req.params;
  try {
    const oneReserv = await reservWisata.find(wisataId).populate({
      path: "wisataId",
    });
    if (!oneReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    return res.status(200).json({ data: oneReserv });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const createReservWisata = (req, res) => {
  // const reservasi = reservWisata.create({
  //   wisataID: req.body.wisataID,
  // });
  // reservasi.then((result) => {
  //   res.status(201).json(result);
  // });
};

const deleteOneReservWisata = async (req, res) => {
  const { wisataId } = req.params;
  try {
    const deletedReserv = await reservCar.findByIdAndDelete(wisataId);
    if (!deletedReserv) {
      res.status(404).json({ error: "Data tidak ditemukan." });
      return;
    }
    res.json("Data Berhasil dihapus.");
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

module.exports = {
  getAllReservWisata,
  getOneReservWisata,
  createReservWisata,
  deleteOneReservWisata,
};
