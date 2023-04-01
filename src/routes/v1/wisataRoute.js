const express = require("express");
const router = express.Router();
const wisataRoute = require("../../controllers/wisataController");

router
  .route("/")
  .get(wisataRoute.getAllWisata)
  .post(wisataRoute.createNewWisata);

router
  .route("/:id")
  .get(wisataRoute.getOneWisata)
  .put(wisataRoute.updateOneWisata)
  .delete(wisataRoute.deleteOneWisata);

module.exports = router;
