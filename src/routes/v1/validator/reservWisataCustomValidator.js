const { body, param } = require("express-validator");

exports.getOneReservWisataCustomValidation = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.deleteOneReservWisataCustomValidation = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];

exports.createReservWisataCustomValidation = [
  body("nama").exists().withMessage("Nama is Required!"),
  body("email").exists().withMessage("Email is Required!"),
  body("nomorTelepon").exists().withMessage("Nomor Telepon is Required!"),
  body("jumlahOrang").exists().withMessage("Jumlah Peserta is Required!"),
  body("tanggalReservasi")
    .exists()
    .withMessage("Tanggal Reservasi is Required!"),
  body("waktuJemput").exists().withMessage("Waktu Jemput is Required!"),
  body("lokasiJemput").exists().withMessage("Lokasi Jemput is Required!"),
  body("pesananTambahan").exists().withMessage("Pesanan Tambahan is Required!"),
  body("lokasiAntar").exists().withMessage("Lokasi Antar is Required!"),
  body("fasilitas")
    .exists()
    .withMessage("Fasilitas Pilihan is Required!"),
  body("armada").exists().withMessage("Armada is Required!"),
];

exports.updateOneReservWisataCustomValidation = [
  param("id")
    .exists()
    .withMessage("ID is Required!")
    .isMongoId()
    .withMessage("Invalid ID!"),
];
