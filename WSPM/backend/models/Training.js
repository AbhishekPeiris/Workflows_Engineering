const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    trainingName: { type: String, required: true },
    completionDate: { type: Date, default: Date.now },
    badge: { type: String }, // e.g., "Safety Master", "Certified Welder"
    certificateUrl: { type: String }, // uploaded file or link
  },
  { timestamps: true }
);

module.exports = mongoose.model("Training", TrainingSchema);
