const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// PDF report generation
router.post("/", reportController.generateReport);

module.exports = router;
