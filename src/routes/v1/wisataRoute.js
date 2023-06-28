const express = require("express");
const router = express.Router();
const wisataRoute = require("../../controllers/wisataController");
const {
  createNewWisataValidator,
  getOneWisataValidator,
  getOnePaketWisataPaxValidator,
  updateImageWisataValidator,
} = require("./validator/wisataValidator");
const { authJWT } = require("../../middlewares/auth");
const { imageHandler } = require("../../middlewares/multer");

router
  .route("/")
  .get(wisataRoute.getAllWisata)
  .post(authJWT, createNewWisataValidator, wisataRoute.createNewWisata);

router
  .route("/:id")
  .put(authJWT, wisataRoute.updateOneWisata)
  .get(getOneWisataValidator, wisataRoute.getOneWisata)
  .delete(authJWT, wisataRoute.deleteOneWisata);

router
  .route("/:idPaket/images")
  .put(
    authJWT,
    imageHandler.array("images", 10),
    updateImageWisataValidator,
    wisataRoute.updateOneWisataImage
  );

router
  .route("/pax/:id&:orang")
  .get(
    authJWT,
    getOnePaketWisataPaxValidator,
    wisataRoute.getOnePaketWisataPax
  );

router.route("/paket/:id").get(authJWT, wisataRoute.getOnePaketWisata);

module.exports = router;
