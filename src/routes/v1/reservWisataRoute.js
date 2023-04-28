const express = require("express");
const router = express.Router();
const reservRoute = require("../../controllers/reservWisataController");
const { authJWT } = require("../../middlewares/auth");
const {
  createReservWisataValidator,
  getOneReservWisataValidator,
  deleteOneReservWisataValidator,
} = require("./validator/reservWisataValidator");

router
  .route("/")
  .get(authJWT, reservRoute.getAllReservWisata)
  .post(createReservWisataValidator, reservRoute.createReservWisata);
router
  .route("/:id")
  .get(authJWT, getOneReservWisataValidator, reservRoute.getOneReservWisata)
  .delete(
    authJWT,
    deleteOneReservWisataValidator,
    reservRoute.deleteOneReservWisata
  );

module.exports = router;
