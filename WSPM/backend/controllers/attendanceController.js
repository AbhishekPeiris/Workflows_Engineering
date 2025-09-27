const Attendance = require("../models/Attendance");
const Worker = require("../models/Worker");

// Check-in
exports.checkIn = async (req, res) => {
  try {
    const { workerId } = req.body;
    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    const attendance = await Attendance.create({
      worker: worker._id,
      checkIn: new Date(),
      method: "QR",
    });

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check-out
exports.checkOut = async (req, res) => {
  try {
    const { workerId } = req.body;
    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    const attendance = await Attendance.findOneAndUpdate(
      { worker: worker._id, checkOut: null },
      { checkOut: new Date() },
      { new: true }
    );

    if (!attendance)
      return res.status(404).json({ error: "No active check-in found" });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get logs
exports.getLogs = async (_req, res) => {
  try {
    const logs = await Attendance.find().populate("worker");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
