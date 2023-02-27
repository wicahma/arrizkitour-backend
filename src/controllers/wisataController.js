const wisataPacket = require("../models/wisataModel");

const getAllWisata = (req, res) => {
  res.send("Get All Wisata");
};

const getOneWisata = (req, res) => {
  res.send("Get All Wisata");
};

const createNewWisata = (req, res) => {
  const { fasilitas, jenisPaket } = req.body;
  const wisata = new wisataPacket({
    fasilitas,
    jenisPaket,
  });
  wisata
    .save()
    .then((result) => {
      console.log(result);
      const hasil = {
        Msg: "Sukses",
        data: result,
      };
      res.status(201).json(hasil);
    })
    .catch((err) => console.log(err));
};

const updateOneWisata = (req, res) => {
  res.send("update One Wisata");
};

const deleteOneWisata = (req, res) => {
  res.send("Delete One Wisata");
};

module.exports = {
  getAllWisata,
  getOneWisata,
  createNewWisata,
  updateOneWisata,
  deleteOneWisata,
};
