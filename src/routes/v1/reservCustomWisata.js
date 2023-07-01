const express = require("express");
const router = express.Router();
const reservRoute = require("../../controllers/reservCustomWisataController");
const { authJWT } = require("../../middlewares/auth");
const {
  createReservWisataCustomValidation,
  getOneReservWisataCustomValidation,
  deleteOneReservWisataCustomValidation,
} = require("./validator/reservWisataCustomValidator");

router
  .route("/")
  .get(reservRoute.getAllreservCustomWisata)
  .post(
    createReservWisataCustomValidation,
    reservRoute.createreservCustomWisata
  );

router
  .route("/:id")
  .get(
    getOneReservWisataCustomValidation,
    authJWT,
    reservRoute.getOnereservCustomWisata
  )
  .delete(
    deleteOneReservWisataCustomValidation,
    authJWT,
    reservRoute.deleteOnereservCustomWisata
  )
  .put(authJWT, reservRoute.updateReservCustomWisata);

router.route("/invoice/:id").get(authJWT, reservRoute.sendInvoice);

module.exports = router;
