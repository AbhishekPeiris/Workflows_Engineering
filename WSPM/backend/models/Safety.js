const mongoose = require("mongoose");

const SafetySchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    date: { type: Date, default: Date.now },
    checklist: {
      helmet: { type: Boolean, default: false },
      vest: { type: Boolean, default: false },
      gloves: { type: Boolean, default: false },
      boots: { type: Boolean, default: false },
      harness: { type: Boolean, default: false },
    },
    issues: { type: String }, // notes about missing/failed gear
    photo: { type: String }, // uploaded proof
  },
  { timestamps: true }
);

module.exports = mongoose.model("Safety", SafetySchema);
