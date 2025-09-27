const express = require("express");
const router = express.Router();
const trainingController = require("../controllers/trainingController");

// Training & gamification
router.post("/", trainingController.addTraining);
router.get("/", trainingController.getTraining);

module.exports = router;
