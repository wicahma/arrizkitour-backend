const { body, param } = require("express-validator");

exports.getOneWisataOutbondValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.createNewWisataOutbondValidator = [
  body("keterangan")
    .exists()
    .withMessage("Keterangan is Required!")
    .isString()
    .withMessage("Keterangan must be a String!"),
  body("nama")
    .exists()
    .withMessage("Nama Paket is Required!")
    .isString()
    .withMessage("Nama Paket must be a string!")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Nama Paket must be at least 3 and under 100 characters long!"
    ),
  body("jenisPaket")
    .exists()
    .withMessage("Jenis Paket is Required!")
    .isArray()
    .withMessage("Jenis Paket must be an array!"),
];

exports.getOnePaketWisataOutbondValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
  param("orang")
    .exists()
    .withMessage("Orang is Required!")
    .isNumeric()
    .withMessage("Orang must be a number!")
    .isLength({ min: 1, max: 2 })
    .withMessage("Orang must be at least 1 and under 2 characters long!"),
];

exports.updateImageWisataOutbondValidator = [
  param("idPaket")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];
