const express = require("express");
const router = express.Router();
const reservRoute = require("../../controllers/reservWisataController");

router.get("/", reservRoute.getAllReservWisata);
router.get("/:wisataId", reservRoute.getOneReservWisata);
router.post("/", reservRoute.createReservWisata);
router.delete("/:wisataId", reservRoute.deleteOneReservWisata);

module.exports = router;
