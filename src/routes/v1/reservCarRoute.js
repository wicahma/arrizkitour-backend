const express = require("express");
const router = express.Router();
const reservCarController = require("../../controllers/reservCarController");
const { authJWT } = require("../../middlewares/auth");

router
  .route("/")
  .get(authJWT, reservCarController.getAllReservCar)
  .post(authJWT, reservCarController.createNewReservCar);
router
  .route("/:id")
  .get(authJWT, reservCarController.getOneReservCar)
  .delete(authJWT, reservCarController.deleteOneReservCar);

module.exports = router;
