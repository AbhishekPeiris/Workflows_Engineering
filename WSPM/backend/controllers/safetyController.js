const Safety = require("../models/Safety");
const Worker = require("../models/Worker");

// Create safety inspection
exports.createInspection = async (req, res) => {
  try {
    console.log("Safety inspection request:", req.body);

    const { workerId, helmet, vest, gloves, boots, harness, issues, photo } = req.body;

    // Validate required fields
    if (!workerId) {
      return res.status(400).json({ error: "Worker ID is required" });
    }

    // Find worker by workerId
    const worker = await Worker.findOne({ workerId: workerId.trim() });
    if (!worker) {
      return res.status(404).json({ error: `Worker with ID ${workerId} not found` });
    }

    // Structure the checklist properly
    const checklist = {
      helmet: Boolean(helmet),
      vest: Boolean(vest),
      gloves: Boolean(gloves),
      boots: Boolean(boots),
      harness: Boolean(harness)
    };

    console.log("Checklist:", checklist);

    // Calculate compliance score
    const totalItems = Object.keys(checklist).length;
    const passedItems = Object.values(checklist).filter(Boolean).length;
    const complianceScore = Math.round((passedItems / totalItems) * 100);

    console.log(`Compliance calculation: ${passedItems}/${totalItems} = ${complianceScore}%`);

    // Create safety record
    const safetyRecord = await Safety.create({
      worker: worker._id,
      checklist,
      issues: issues || "",
      photo: photo || ""
    });

    // Update worker's compliance score
    worker.complianceScore = complianceScore;
    await worker.save();

    console.log("Safety record created:", safetyRecord._id);

    // Return the record with populated worker data
    const populatedRecord = await Safety.findById(safetyRecord._id)
      .populate('worker', 'workerId name');

    // Add computed fields for frontend
    const responseData = {
      ...populatedRecord.toObject(),
      workerId: worker.workerId,
      workerName: worker.name,
      complianceScore: complianceScore,
      passedItems,
      totalItems
    };

    res.json(responseData);

  } catch (err) {
    console.error("Safety inspection creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get inspections
exports.getInspections = async (req, res) => {
  try {
    const records = await Safety.find()
      .populate("worker", "workerId name complianceScore")
      .sort({ createdAt: -1 });

    // Transform records to include computed fields
    const transformedRecords = records.map(record => {
      const checklist = record.checklist || {};
      const totalItems = Object.keys(checklist).length;
      const passedItems = Object.values(checklist).filter(Boolean).length;
      const complianceScore = totalItems > 0 ? Math.round((passedItems / totalItems) * 100) : 0;

      return {
        _id: record._id,
        workerId: record.worker?.workerId || 'N/A',
        workerName: record.worker?.name || 'Unknown',
        checklist: record.checklist,
        issues: record.issues,
        photo: record.photo,
        date: record.date,
        createdAt: record.createdAt,
        complianceScore: record.worker?.complianceScore || complianceScore,
        passedItems,
        totalItems
      };
    });

    console.log("Safety inspections retrieved:", transformedRecords.length);
    res.json(transformedRecords);

  } catch (err) {
    console.error("Get safety inspections error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single inspection
exports.getInspection = async (req, res) => {
  try {
    const record = await Safety.findById(req.params.id)
      .populate("worker", "workerId name complianceScore");

    if (!record) {
      return res.status(404).json({ error: "Safety inspection not found" });
    }

    res.json(record);
  } catch (err) {
    console.error("Get safety inspection error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update inspection
exports.updateInspection = async (req, res) => {
  try {
    const { helmet, vest, gloves, boots, harness, issues, photo } = req.body;

    const checklist = {
      helmet: Boolean(helmet),
      vest: Boolean(vest),
      gloves: Boolean(gloves),
      boots: Boolean(boots),
      harness: Boolean(harness)
    };

    const record = await Safety.findByIdAndUpdate(
      req.params.id,
      { checklist, issues, photo },
      { new: true }
    ).populate("worker", "workerId name");

    if (!record) {
      return res.status(404).json({ error: "Safety inspection not found" });
    }

    // Update worker compliance score
    const totalItems = Object.keys(checklist).length;
    const passedItems = Object.values(checklist).filter(Boolean).length;
    const complianceScore = Math.round((passedItems / totalItems) * 100);

    const worker = await Worker.findById(record.worker._id);
    if (worker) {
      worker.complianceScore = complianceScore;
      await worker.save();
    }

    res.json(record);
  } catch (err) {
    console.error("Update safety inspection error:", err);
    res.status(500).json({ error: err.message });
  }
};
