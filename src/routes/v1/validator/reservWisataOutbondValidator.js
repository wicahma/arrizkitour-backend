const { body, param } = require("express-validator");

exports.getOneReservWisataOutbondValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.deleteOneReservWisataOutbondValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.createReservWisataOutbondValidator = [
  body("nama").exists().withMessage("Nama is Required!"),
  body("email").exists().withMessage("Email is Required!"),
  body("nomorTelepon").exists().withMessage("Nomor Telepon is Required!"),
  body("paketID").exists().withMessage("Paket ID is Required!"),
  body("jumlahPeserta").exists().withMessage("Jumlah Peserta is Required!"),
  body("tanggalReservasi")
    .exists()
    .withMessage("Tanggal Reservasi is Required!"),
  body("waktuJemput").exists().withMessage("Waktu Jemput is Required!"),
  body("lokasiJemput").exists().withMessage("Lokasi Jemput is Required!"),
  body("pesananTambahan").exists().withMessage("Pesanan Tambahan is Required!"),
];

exports.updateOneReservWisataOutbondValidator = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
  body("jumlahPeserta").exists().withMessage("Jumlah Peserta is Required!"),
  body("tanggalReservasi")
    .exists()
    .withMessage("Tanggal Reservasi is Required!"),
  body("waktuJemput").exists().withMessage("Waktu Jemput is Required!"),
  body("lokasiJemput").exists().withMessage("Lokasi Jemput is Required!"),
  body("pesananTambahan").exists().withMessage("Pesanan Tambahan is Required!"),
];
