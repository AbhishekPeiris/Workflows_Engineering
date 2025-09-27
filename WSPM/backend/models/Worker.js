const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema(
  {
    workerId: { type: String, required: true, unique: true }, // Unique ID
    name: {
      type: String,
      required: true,
      validate: {
        validator: (v) => v && v.trim().length > 0,
        message: "Name is required",
      },
    },
    dob: { type: Date, required: true },
    contact: {
      phone: {
        type: String,
        required: true,
        validate: {
          validator: (v) => v && v.trim().length > 0,
          message: "Phone number is required",
        },
      },
      email: { type: String, default: "" },
      emergencyContact: { type: String, default: "" },
    },
    role: { type: String, required: true }, // e.g., Welder, Manager
    hireDate: { type: Date, default: Date.now },
    shiftSchedule: { type: String, default: "" }, // e.g., Morning, Evening, Night
    certifications: [String], // list of certifications
    trainingHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Training" },
    ],
    complianceScore: { type: Number, default: 100 }, // used for bonuses/warnings
    qrCode: { type: String }, // path or data URL for QR
  },
  { timestamps: true }
);

module.exports = mongoose.model("Worker", WorkerSchema);
module.exports = mongoose.model("Worker", WorkerSchema);
