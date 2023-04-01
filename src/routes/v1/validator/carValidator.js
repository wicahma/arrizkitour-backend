// const validator = require("express-validator");

const { body, param } = require("express-validator");

exports.getOneCar = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];
