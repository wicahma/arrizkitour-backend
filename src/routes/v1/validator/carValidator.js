const { body, param } = require("express-validator");

exports.getOneCarValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.createNewCarValidator = [
  body("nama")
    .exists()
    .withMessage("Nama is Required!")
    .isString()
    .withMessage("Nama must be a string!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama must be at least 3 and under 100 characters long!"),
  body("harga")
    .exists()
    .withMessage("Harga is Required!")
    .isNumeric()
    .withMessage("Harga must be a number!"),
  body("seat")
    .exists()
    .withMessage("Seat is Required!")
    .isNumeric()
    .withMessage("Seat must be a number!"),
];

exports.updateCarValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
  body("nama")
    .exists()
    .withMessage("Nama is Required!")
    .isString()
    .withMessage("Nama must be a string!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nama must be at least 3 and under 100 characters long!"),
  body("harga")
    .exists()
    .withMessage("Harga is Required!")
    .isNumeric()
    .withMessage("Harga must be a number!"),
  body("seat")
    .exists()
    .withMessage("Seat is Required!")
    .isNumeric()
    .withMessage("Seat must be a number!"),
  body("status")
    .isString()
    .withMessage("Status must be a 'aktif' or 'nonaktif'!"),
];

exports.deleteCarValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.updateImageCarValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];
