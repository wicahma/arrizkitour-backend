const express = require("express");
const router = express.Router();
const reservRoute = require("../../controllers/reservWisataController");
const { authJWT } = require("../../middlewares/auth");
const {
  createReservWisataValidator,
  getOneReservWisataValidator,
  deleteOneReservWisataValidator,
  updateOneReservWisataValidator,
} = require("./validator/reservWisataValidator");

router
  .route("/")
  .get(reservRoute.getAllReservWisata)
  .post(createReservWisataValidator, reservRoute.createReservWisata);
router
  .route("/:id")
  .get(getOneReservWisataValidator, reservRoute.getOneReservWisata)
  .delete(
    authJWT,
    deleteOneReservWisataValidator,
    reservRoute.deleteOneReservWisata
  )
  .put(
    authJWT,
    updateOneReservWisataValidator,
    reservRoute.updateOneReservWisata
  );

module.exports = router;
