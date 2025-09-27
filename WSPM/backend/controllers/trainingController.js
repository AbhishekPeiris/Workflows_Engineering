const Training = require("../models/Training");
const Worker = require("../models/Worker");

// Add training record
exports.addTraining = async (req, res) => {
  try {
    const { workerId, trainingName, badge, certificateUrl } = req.body;

    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    const training = await Training.create({
      worker: worker._id,
      trainingName,
      badge,
      certificateUrl,
    });

    worker.trainingHistory.push(training._id);
    await worker.save();

    res.json(training);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get training records
exports.getTraining = async (_req, res) => {
  try {
    const list = await Training.find().populate("worker");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
