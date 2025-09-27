const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workerController");

// CRUD Worker Profiles
router.post("/", workerController.createWorker);
router.get("/", workerController.getWorkers);
router.get("/next-id", workerController.getNextWorkerId);
router.get("/:id", workerController.getWorker);
router.put("/:id", workerController.updateWorker);
router.delete("/:id", workerController.deleteWorker);

module.exports = router;
