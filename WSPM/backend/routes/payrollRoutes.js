const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");

// Payroll CRUD operations
router.post("/", payrollController.generatePayroll);
router.get("/", payrollController.getPayrolls);
router.get("/:id", payrollController.getPayroll);
router.put("/:id/status", payrollController.updatePayrollStatus);

module.exports = router;
