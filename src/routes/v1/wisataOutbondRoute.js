const express = require("express");
const router = express.Router();
const outbondRoute = require("../../controllers/wisataOutbondController");
const { authJWT } = require("../../middlewares/auth");
const { imageHandler } = require("../../middlewares/multer");
const {
  createNewWisataOutbondValidator,
  getOneWisataOutbondValidator,
  updateImageWisataOutbondValidator,
  getOnePaketWisataOutbondValidator,
} = require("./validator/wisataOutbondValidator");

router
  .route("/")
  .get(outbondRoute.getAllWisataOutbond)
  .post(
    authJWT,
    createNewWisataOutbondValidator,
    outbondRoute.createNewWisataOutbond
  );

router
  .route("/:id")
  .put(authJWT, outbondRoute.updateOneWisataOutbond)
  .get(getOneWisataOutbondValidator, outbondRoute.getOneWisataOutbond)
  .delete(authJWT, outbondRoute.deleteOneWisataOutbond);

router
  .route("/:idPaket/images")
  .put(
    authJWT,
    imageHandler.array("images", 10),
    updateImageWisataOutbondValidator,
    outbondRoute.updateOneWisataOutbondImage
  );

router
  .route("/paket/:id")
  .get(
    getOnePaketWisataOutbondValidator,
    outbondRoute.getOnePaketWisataOutbond
  );

module.exports = router;
