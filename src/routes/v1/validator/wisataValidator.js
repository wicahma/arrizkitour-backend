const { body, param } = require("express-validator");

exports.getOneWisataValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.createNewWisataValidator = [
  body("fasilitas")
    .exists()
    .withMessage("Fasilitas is Required!")
    .isArray()
    .withMessage("Fasilitas must be an array!"),
  body("nama")
    .exists()
    .withMessage("Nama Paket is Required!")
    .isString()
    .withMessage("Nama Paket must be a string!")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Nama Paket must be at least 3 and under 100 characters long!"
    ),
];
