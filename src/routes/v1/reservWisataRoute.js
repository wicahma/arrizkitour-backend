const express = require("express");
const router = express.Router();
const reservRoute = require("../../controllers/reservWisataController");
const { authJWT } = require("../../middlewares/auth");

router
  .route("/")
  .get(authJWT, reservRoute.getAllReservWisata)
  .post(authJWT, reservRoute.createReservWisata);
router
  .route("/:id")
  .get(authJWT, reservRoute.getOneReservWisata)
  .delete(authJWT, reservRoute.deleteOneReservWisata);

module.exports = router;
