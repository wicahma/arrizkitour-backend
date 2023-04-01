const express = require("express");
const router = express.Router();
const reservRoute = require("../../controllers/reservWisataController");

router
  .route("/")
  .get(reservRoute.getAllReservWisata)
  .post(reservRoute.createReservWisata);
router
  .route("/:id")
  .get(reservRoute.getOneReservWisata)
  .delete(reservRoute.deleteOneReservWisata);

module.exports = router;
