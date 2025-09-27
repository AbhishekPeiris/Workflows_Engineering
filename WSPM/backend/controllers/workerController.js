const Worker = require("../models/Worker");
const QRCode = require("qrcode");

// Generate next worker ID
const generateNextWorkerId = async () => {
  try {
    // Find all workers and get the highest worker ID number
    const workers = await Worker.find({}, { workerId: 1 })
      .sort({ workerId: -1 })
      .limit(1);

    if (workers.length === 0) {
      return "W001";
    }

    // Extract number from last worker ID (e.g., "W001" -> 1)
    const lastWorkerId = workers[0].workerId;
    const lastNumber = parseInt(lastWorkerId.substring(1));
    const nextNumber = lastNumber + 1;

    // Format with leading zeros (e.g., 2 -> "W002")
    return `W${nextNumber.toString().padStart(3, "0")}`;
  } catch (error) {
    throw new Error("Failed to generate worker ID");
  }
};

// Create new worker with QR
exports.createWorker = async (req, res) => {
  try {
    let {
      workerId,
      name,
      dob,
      contactInfo,
      emergencyDetails,
      role,
      phone,
      hireDate,
      shiftSchedule,
    } = req.body;

    // Auto-generate worker ID if not provided
    if (!workerId) {
      workerId = await generateNextWorkerId();
    } else {
      // Check if provided worker ID already exists
      const existing = await Worker.findOne({ workerId });
      if (existing) {
        return res.status(400).json({ error: "Worker ID already exists" });
      }
    }

    // Generate QR code data URL
    const qrData = `worker:${workerId}`;
    const qrCode = await QRCode.toDataURL(qrData);

    // Structure the data to match the schema
    const workerData = {
      workerId,
      name: name.trim(),
      dob: new Date(dob),
      contact: {
        phone: phone.trim(),
        email: contactInfo ? contactInfo.trim() : "",
        emergencyContact: emergencyDetails ? emergencyDetails.trim() : "",
      },
      role: role.trim(),
      hireDate: hireDate ? new Date(hireDate) : new Date(),
      shiftSchedule: shiftSchedule ? shiftSchedule.trim() : "",
      qrCode,
    };

    const worker = await Worker.create(workerData);
    res.json(worker);
  } catch (err) {
    console.error("Worker creation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all workers with search functionality
exports.getWorkers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      // Create case-insensitive search across multiple fields
      const searchRegex = new RegExp(search, "i");
      query = {
        $or: [
          { workerId: searchRegex },
          { name: searchRegex },
          { role: searchRegex },
          { "contact.phone": searchRegex },
          { "contact.email": searchRegex },
        ],
      };
    }

    const workers = await Worker.find(query).populate("trainingHistory");
    res.json(workers);
  } catch (err) {
    console.error("Get workers error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get single worker
exports.getWorker = async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).populate("trainingHistory");
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json(worker);
  } catch (err) {
    console.error("Get worker error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update worker
exports.updateWorker = async (req, res) => {
  try {
    const {
      workerId,
      name,
      dob,
      contactInfo,
      emergencyDetails,
      role,
      phone,
      hireDate,
      shiftSchedule,
    } = req.body;

    // Structure the update data properly
    const updateData = {
      workerId: workerId.trim(),
      name: name.trim(),
      dob: new Date(dob),
      contact: {
        phone: phone.trim(),
        email: contactInfo ? contactInfo.trim() : "",
        emergencyContact: emergencyDetails ? emergencyDetails.trim() : "",
      },
      role: role.trim(),
      hireDate: hireDate ? new Date(hireDate) : new Date(),
      shiftSchedule: shiftSchedule ? shiftSchedule.trim() : "",
    };

    const worker = await Worker.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json(worker);
  } catch (err) {
    console.error("Update worker error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Delete worker
exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json({ message: "Worker deleted successfully" });
  } catch (err) {
    console.error("Delete worker error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get next available worker ID
exports.getNextWorkerId = async (req, res) => {
  try {
    const nextId = await generateNextWorkerId();
    res.json({ nextWorkerId: nextId });
  } catch (err) {
    console.error("Get next worker ID error:", err);
    res.status(500).json({ error: err.message });
  }
};
