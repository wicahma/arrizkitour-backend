const expressAsyncHandler = require("express-async-handler");
const user = require("../models/userModel");
const { generateToken } = require("../middlewares/auth");
const { validationResult } = require("express-validator");

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, pass } = req.body;
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const isExist = await user.findOne({ email: email });
    if (!isExist) {
      res.status(404);
      throw new Error("Email tidak ditemukan");
    }
    const isPassMatch = pass === isExist.password;
    console.log(isPassMatch);
    console.log(isExist);
    if (!isPassMatch) {
      res.status(400);
      throw new Error("Password salah");
    }
    const token = generateToken(isExist._id);
    res.status(200).json({ data: { token: token } });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const getUser = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;

  try {
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const checkUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const isExist = await user.findById(id);
    if (!isExist) {
      res.status(404);
      throw new Error("Unauthorized!");
    }
    res.status(200).json({ validated: true });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

const adminRegister = expressAsyncHandler(async (req, res) => {
  const { email, pass, nickname } = req.body;
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    res.status(400);
    throw {
      name: "Validation Error",
      message: isError.errors[0].msg,
      stack: isError.errors,
    };
  }

  try {
    const createUser = await user.create({
      email: email,
      password: pass,
      nickname: nickname,
      role: "admin",
    });

    if (!createUser) {
      res.status(400);
      throw new Error("Gagal membuat akun");
    }
    res.status(200).json({ message: createUser });
  } catch (err) {
    if (!res.status) res.status(500);
    throw new Error(err);
  }
});

module.exports = {
  userLogin,
  adminRegister,
  checkUser
};
