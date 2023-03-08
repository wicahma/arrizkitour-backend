const express = require("express");
const router = express.Router();
const reservRoute = require("../../controllers/reservWisataController");

router.get("/", reservRoute.getAllReservWisata);
router.get("/:id", reservRoute.getOneReservWisata);
router.post("/", reservRoute.createReservWisata);
router.put("/:id", reservRoute.updateOneReservWisata);
router.delete("/:id", reservRoute.deleteOneReservWisata);

module.exports = router;
