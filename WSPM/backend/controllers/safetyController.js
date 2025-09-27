const Safety = require("../models/Safety");
const Worker = require("../models/Worker");

// Create safety inspection
exports.createInspection = async (req, res) => {
  try {
    const { workerId, checklist, issues, photo } = req.body;

    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    const record = await Safety.create({
      worker: worker._id,
      checklist,
      issues,
      photo,
    });

    // Update compliance score (simple % calculation)
    const score = Object.values(checklist).filter(Boolean).length * 20;
    worker.complianceScore = score;
    await worker.save();

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get inspections
exports.getInspections = async (_req, res) => {
  try {
    const records = await Safety.find().populate("worker");
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
