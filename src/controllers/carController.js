const rentCar = require("../models/carModel.js");

const getAllCar = (req, res) => {
  res.send("Get All Mobil");
};

const getOneCar = (req, res) => {
  res.send("Get One Mobil");
};

const createNewCar = (req, res) => {
  const { unitName, seat, pricePerDay } = req.body;
  const car = rentCar.create({
    unitName,
    seat,
    pricePerDay,
  });

  res.status(200).json(car);

  // rentCar
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     const hasil = {
  //       Msg: "Sukses",
  //       data: result,
  //     };
  //     res.status(201).json(hasil);
  //   })
  //   .catch((err) => console.log(err));
};

const updateOneCar = (req, res) => {
  res.send("Update Packet");
};

const deleteOneCar = (req, res) => {
  res.send("Delete Packet");
};

module.exports = {
  getAllCar,
  getOneCar,
  createNewCar,
  updateOneCar,
  deleteOneCar,
};
