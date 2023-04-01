const express = require("express");
const router = express.Router();
const CarController = require("../../controllers/carController");
const {
  getOneCarValidator,
  createNewCarValidator,
  deleteCarValidator,
  updateCarValidator,
  updateImageCarValidator,
} = require("./validator/carValidator");
const { multers } = require("../../middlewares/multer");

router
  .route("/")
  .get(CarController.getAllCar)
  .post(
    multers.single("gambar"),
    createNewCarValidator,
    CarController.createNewCar
  );

router
  .route("/:id")
  .get(getOneCarValidator, CarController.getOneCar)
  .put(updateCarValidator, CarController.updateOneCar)
  .delete(deleteCarValidator, CarController.deleteOneCar);

router
  .route("/:id/images")
  .put(
    multers.single("gambar"),
    updateImageCarValidator,
    CarController.updateImageCar
  );

module.exports = router;
