const express = require("express");
const router = express.Router();
const wisataRoute = require("../../controllers/wisataController");
const {
  createNewWisataValidator,
  getOneWisataValidator,
} = require("./validator/wisataValidator");

router
  .route("/")
  .get(wisataRoute.getAllWisata)
  .post(createNewWisataValidator, wisataRoute.createNewWisata);

router
  .route("/:id")
  .get(getOneWisataValidator, wisataRoute.getOneWisata)
  .put(wisataRoute.updateOneWisata)
  .delete(wisataRoute.deleteOneWisata);

router.route("/pax/:id&:orang").get(wisataRoute.getOnePaketWisataPax);

module.exports = router;
