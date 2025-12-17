const express = require("express");
const router = express.Router();
const controller = require("../controllers/aircraft.controller");
const auth = require("../middleware/auth.middleware");


router.post("/create", controller.createAircraft);
router.get("/list", auth, controller.listAircraft);


module.exports = router;
