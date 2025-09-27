const mongoose = require("mongoose");

const ShiftSwapSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    requestedShift: { type: String, required: true }, // e.g., "Night"
    reason: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    replacement: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" }, // suggested replacement
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShiftSwap", ShiftSwapSchema);
