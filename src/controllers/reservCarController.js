const { model } = require("mongoose");
const reservCar = require("../models/reservCarModel");

const getAllReserv = async (req, res) => {
  try {
    const allReserv = await reservCar.find().populate({
      path: "unitId",
    });
    res.status(200).json({ data: allReserv });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const getOneReserv = async (req, res) => {
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
    res.status(500).json({ error: err?.message || err });
  }
};

const createNewReserv = async (req, res) => {
  const newReservData = { ...req.body };

  try {
    const newReserv = new reservCar({
      ...newReservData,
    });

    const savedReserv = await newReserv.save();
    res.status(201).json({ data: savedReserv });
  } catch (err) {
    res.status(500).json({ error: err?.message || err });
  }
};

const deleteOneReserv = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReserv = await reservCar.findByIdAndDelete(id);
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
  getAllReserv,
  getOneReserv,
  createNewReserv,
  deleteOneReserv,
};
