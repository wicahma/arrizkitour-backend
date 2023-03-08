const express = require("express");
const router = express.Router();
const wisataRoute = require("../../controllers/wisataController");

router.get("/", wisataRoute.getAllWisata);
router.get("/:id", wisataRoute.getOneWisata);
router.post("/", wisataRoute.createNewWisata);
router.put("/:id", wisataRoute.updateOneWisata);
router.delete("/:id", wisataRoute.deleteOneWisata);

module.exports = router;
