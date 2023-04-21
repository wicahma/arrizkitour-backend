const { body } = require("express-validator");

exports.getOneReservCarValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.deleteOneReservCarValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.createNewReservCarValidator = [
  body("nama").exists().withMessage("Nama is Required!"),
  body("email")
    .exists()
    .withMessage("Email is Required!")
    .isEmail()
    .withMessage("Please insert a valid email!"),
  body("nomorTelepon").exists().withMessage("Nomor Telepon is Required!"),
  body("jenisMobil").exists().withMessage("Mobil ID is Required!"),
  body("tanggalReservasi")
    .exists()
    .withMessage("Tanggal Reservasi is Required!"),
  body("waktuAntar").exists().withMessage("Waktu Antar is Required!"),
  body("lokasiAntar").exists().withMessage("Lokasi Antar is Required!"),
  body("pesananTambahan").exists().withMessage("Pesanan Tambahan is Required!"),
];
