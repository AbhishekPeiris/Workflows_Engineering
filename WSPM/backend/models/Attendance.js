const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    date: { type: Date, default: Date.now },
    checkIn: { type: Date },
    checkOut: { type: Date },
    method: { type: String, enum: ["QR", "Manual"], default: "Manual" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);
