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
const { authJWT } = require("../../middlewares/auth");

router
  .route("/")
  .get(CarController.getAllCar)
  .post(
    authJWT,
    multers.single("images"),
    createNewCarValidator,
    CarController.createNewCar
  );

router
  .route("/:id")
  .get(getOneCarValidator, CarController.getOneCar)
  .put(authJWT, updateCarValidator, CarController.updateOneCar)
  .delete(authJWT, deleteCarValidator, CarController.deleteOneCar);

router
  .route("/:id/images")
  .put(
    authJWT,
    multers.single("images"),
    updateImageCarValidator,
    CarController.updateImageCar
  );

module.exports = router;
