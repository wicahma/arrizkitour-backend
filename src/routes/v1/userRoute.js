const express = require("express");
const {
  userLogin,
  adminRegister,
} = require("../../controllers/userController");
const {
  loginValidator,
  registerValidator,
} = require("./validator/userValidation");
const { authJWT } = require("../../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .put(loginValidator, userLogin)
  .post(authJWT, registerValidator, adminRegister);

module.exports = router;
