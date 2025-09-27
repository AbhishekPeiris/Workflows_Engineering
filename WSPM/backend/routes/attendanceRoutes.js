const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

// Attendance Check-in / Check-out
router.post("/checkin", attendanceController.checkIn);
router.post("/checkout", attendanceController.checkOut);

// Get all attendance logs
router.get("/", attendanceController.getLogs);

// Get worker status
router.get("/status/:workerId", attendanceController.getWorkerStatus);

module.exports = router;
