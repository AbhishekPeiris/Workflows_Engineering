const Worker = require("../models/Worker");
const QRCode = require("qrcode");

// Create new worker with QR
exports.createWorker = async (req, res) => {
  try {
    const { workerId, name, dob, contact, role, shiftSchedule } = req.body;

    // Duplicate check
    const existing = await Worker.findOne({ workerId });
    if (existing)
      return res.status(400).json({ error: "Worker ID already exists" });

    // Generate QR code data URL
    const qrData = `worker:${workerId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const worker = await Worker.create({
      workerId,
      name,
      dob,
      contact,
      role,
      shiftSchedule,
      qrCode,
    });

    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all workers
exports.getWorkers = async (_req, res) => {
  try {
    const workers = await Worker.find().populate("trainingHistory");
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single worker
exports.getWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).populate(
      "trainingHistory"
    );
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update worker
exports.updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete worker
exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json({ message: "Worker deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
