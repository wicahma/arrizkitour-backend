const express = require("express");
const router = express.Router();
const wisataRoute = require("../../controllers/wisataController");
const {
  createNewWisataValidator,
  getOneWisataValidator,
  getOnePaketWisataPaxValidator,
} = require("./validator/wisataValidator");
const { authJWT } = require("../../middlewares/auth");

router
  .route("/")
  .get(wisataRoute.getAllWisata)
  .post(authJWT, createNewWisataValidator, wisataRoute.createNewWisata);

router
  .route("/:id")
  .get(getOneWisataValidator, wisataRoute.getOneWisata)
  .put(authJWT, wisataRoute.updateOneWisata)
  .delete(authJWT, wisataRoute.deleteOneWisata);

router
  .route("/pax/:id&:orang")
  .get(
    authJWT,
    getOnePaketWisataPaxValidator,
    wisataRoute.getOnePaketWisataPax
  );

module.exports = router;
