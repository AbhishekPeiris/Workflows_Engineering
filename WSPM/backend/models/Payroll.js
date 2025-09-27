const mongoose = require("mongoose");

const PayrollSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    period: { type: String, required: true }, // e.g., "2025-09" for Sept 2025
    baseRate: { type: Number, required: true }, // stored pay rate
    hoursWorked: { type: Number, default: 0 },
    totalPay: { type: Number, default: 0 },
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
    slipPath: { type: String }, // PDF/Email copy of salary slip
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", PayrollSchema);
