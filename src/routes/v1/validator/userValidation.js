const { body, param } = require("express-validator");

exports.loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is Required!")
    .isEmail()
    .withMessage("Invalid Email!"),
  body("pass").exists().withMessage("Password is Required!").isString(),
];

exports.registerValidator = [
  body("email")
    .exists()
    .withMessage("Email is Required!")
    .isEmail()
    .withMessage("Invalid Email!"),
  body("pass")
    .exists()
    .withMessage("Password is Required!")
    .isString()
    .withMessage("Password must be a string!")
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be at least 6 and under 100 characters long!"),
  body("nickname")
    .exists()
    .withMessage("Nickname is Required!")
    .isString()
    .withMessage("Nickname must be a string!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Nickname must be at least 3 and under 100 characters long!"),
];

exports.idCheckValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];
