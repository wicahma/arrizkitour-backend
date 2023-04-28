const express = require("express");
const {
  userLogin,
  adminRegister,
  checkUser,
} = require("../../controllers/userController");
const {
  loginValidator,
  registerValidator,
  idCheckValidator,
} = require("./validator/userValidation");
const { authJWT } = require("../../middlewares/auth");
const router = express.Router();

router
  .route("/")
  .put(loginValidator, userLogin)
  .post(authJWT, registerValidator, adminRegister);

router.route("/check/:id").get(idCheckValidator, checkUser);

module.exports = router;
