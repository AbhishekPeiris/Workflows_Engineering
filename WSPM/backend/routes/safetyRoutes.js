const express = require("express");
const router = express.Router();
const safetyController = require("../controllers/safetyController");

// Safety inspections CRUD
router.post("/", safetyController.createInspection);
router.get("/", safetyController.getInspections);
router.get("/:id", safetyController.getInspection);
router.put("/:id", safetyController.updateInspection);

module.exports = router;
