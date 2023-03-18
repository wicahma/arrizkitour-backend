const express = require("express");
const router = express.Router();
const CarController = require("../../controllers/carController");

router.get("/", CarController.getAllCar);
router.get("/:id", CarController.getOneCar);
router.post("/", CarController.createNewCar);
router.put("/:id", CarController.updateOneCar);
router.delete("/:id", CarController.deleteOneCar);

module.exports = router;
