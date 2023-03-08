const express = require("express");
const router = express.Router();
const CarController = require("../../controllers/carController");

router.get("/", CarController.getAllCar);
router.get("/:carId", CarController.getOneCar);
router.post("/", CarController.createNewCar);
router.put("/:carId", CarController.updateOneCar);
router.delete("/:carId", CarController.deleteOneCar);

module.exports = router;
