const express = require("express");
const router = express.Router();
const controller = require("../controllers/flight.controller");
const auth = require("../middleware/auth.middleware");

router.post("/create", auth, controller.createFlight);
router.get("/", auth, controller.listFlights);
router.get("/latest", auth, controller.latestFlights); //
router.put("/:id", auth, controller.updateFlight);
router.delete("/:id", auth, controller.deleteFlight);



module.exports = router;
