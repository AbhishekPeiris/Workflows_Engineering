const Incident = require("../models/Incident");
const Worker = require("../models/Worker");

// Report incident
exports.reportIncident = async (req, res) => {
  try {
    const {
      workerId,
      location,
      severity,
      description,
      witnesses,
      attachments,
    } = req.body;

    const worker = workerId ? await Worker.findOne({ workerId }) : null;

    const incident = await Incident.create({
      worker: worker?._id,
      location,
      severity,
      description,
      witnesses,
      attachments,
    });

    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get incidents
exports.getIncidents = async (_req, res) => {
  try {
    const list = await Incident.find().populate("worker");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
