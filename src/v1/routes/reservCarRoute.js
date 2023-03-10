const express = require("express");
const router = express.Router();
const reservCarController = require("../../controllers/reservCarController");

router.get("/", reservCarController.getAllReserv);
router.get("/:id", reservCarController.getOneReserv);
router.post("/", reservCarController.createNewReserv);
router.delete("/:id", reservCarController.deleteOneReserv);

module.exports = router;
