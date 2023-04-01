const express = require("express");
const router = express.Router();
const CarController = require("../../controllers/carController");
const { getOneCar } = require("./validator/carValidator");

router.route("/").get(CarController.getAllCar).post(CarController.createNewCar);

router
  .route("/:id")
  .get(getOneCar, CarController.getOneCar)
  .put(CarController.updateOneCar)
  .delete(CarController.deleteOneCar);

module.exports = router;
