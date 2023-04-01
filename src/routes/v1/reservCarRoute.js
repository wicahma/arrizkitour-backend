const express = require("express");
const router = express.Router();
const reservCarController = require("../../controllers/reservCarController");

router
  .route("/")
  .get(reservCarController.getAllReservCar)
  .post(reservCarController.createNewReservCar);
router
  .route("/:id")
  .get(reservCarController.getOneReservCar)
  .delete(reservCarController.deleteOneReservCar);

module.exports = router;
