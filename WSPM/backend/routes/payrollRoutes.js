const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");

// Payroll generation & retrieval
router.post("/", payrollController.generatePayroll);
router.get("/", payrollController.getPayrolls);

module.exports = router;
