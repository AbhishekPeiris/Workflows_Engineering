const express = require("express");
const router = express.Router();
const safetyController = require("../controllers/safetyController");

// Safety inspections
router.post("/", safetyController.createInspection);
router.get("/", safetyController.getInspections);

module.exports = router;
