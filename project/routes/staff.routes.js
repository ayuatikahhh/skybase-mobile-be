const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/staff.controller");

router.get("/profile", auth, controller.getProfile);

module.exports = router;
