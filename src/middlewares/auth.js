const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");
const user = require("../models/userModel");

const authJWT = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_CODE);

      const isAdmin = await user.findById(decoded.id);

      if (isAdmin.role !== "admin") {
        res.status(401);
        throw new Error("Not Authorized");
      }

      res.locals.user = isAdmin;
    } catch (err) {
      res.status(401);
      throw new Error(err);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized!");
  }
  return next();
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_CODE, {
    expiresIn: "1d",
  });
};

module.exports = { authJWT, generateToken };
