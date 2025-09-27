const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
    time: { type: Date, default: Date.now },
    location: { type: String, required: true },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true,
    },
    description: { type: String, required: true },
    witnesses: [String],
    attachments: [String], // image/file paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", IncidentSchema);
