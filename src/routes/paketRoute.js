const express = require("express");
const router = express.Router();
const paketController = require("../controllers/paketController");

router.get("/", paketController.getAllPacket);
router.get("/:id", paketController.getOnePacket);
router.post("/:id", paketController.createNewPacket);
router.put("/:id", paketController.updateOnePacket);
router.delete("/:id", paketController.deleteOnePacket);
module.exports = router;
