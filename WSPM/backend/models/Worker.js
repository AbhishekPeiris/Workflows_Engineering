const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema(
  {
    workerId: { type: String, required: true, unique: true }, // Unique ID
    name: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^[A-Za-z\s]+$/.test(v),
        message:
          "Name must contain only letters and spaces (no special characters)",
      },
    },
    dob: { type: Date, required: true },
    contact: {
      phone: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /^\d{10}$/.test(v),
          message: "Phone number must be exactly 10 digits",
        },
      },
      email: { type: String },
      emergencyContact: { type: String },
    },
    role: { type: String, required: true }, // e.g., Welder, Manager
    hireDate: { type: Date, default: Date.now },
    shiftSchedule: { type: String }, // e.g., Morning, Evening, Night
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
