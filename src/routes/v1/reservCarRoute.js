const express = require("express");
const router = express.Router();
const reservCarController = require("../../controllers/reservCarController");
const { authJWT } = require("../../middlewares/auth");
const {
  createNewReservCarValidator,
  getOneReservCarValidator,
  deleteOneReservCarValidator,
} = require("./validator/reservCarvalidator");

router
  .route("/")
  .get(reservCarController.getAllReservCar)
  .post(createNewReservCarValidator, reservCarController.createNewReservCar);
router
  .route("/:id")
  .get(authJWT, getOneReservCarValidator, reservCarController.getOneReservCar)
  .delete(
    authJWT,
    deleteOneReservCarValidator,
    reservCarController.deleteOneReservCar
  )
  .put(authJWT, reservCarController.updateOneReservCar);
router.route("/invoice/:id").get(authJWT, reservCarController.sendInvoice);

module.exports = router;
