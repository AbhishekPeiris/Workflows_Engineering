const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidentController");

// Incident reporting
router.post("/", incidentController.reportIncident);
router.get("/", incidentController.getIncidents);

module.exports = router;
