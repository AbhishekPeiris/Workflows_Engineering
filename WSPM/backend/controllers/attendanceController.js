const Attendance = require("../models/Attendance");
const Worker = require("../models/Worker");

// Check-in
exports.checkIn = async (req, res) => {
  try {
    const { workerId } = req.body;
    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    // Check if worker already checked in today
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const existingCheckIn = await Attendance.findOne({
      worker: worker._id,
      checkIn: { $gte: startOfDay, $lt: endOfDay },
      checkOut: null,
    });

    if (existingCheckIn) {
      return res
        .status(400)
        .json({ error: "Worker already checked in today" });
    }

    const attendance = await Attendance.create({
      worker: worker._id,
      checkIn: new Date(),
      method: req.body.method || "Manual",
    });

    const populatedAttendance = await Attendance.findById(attendance._id).populate(
      "worker"
    );
    res.json(populatedAttendance);
  } catch (err) {
    console.error("Check-in error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Check-out
exports.checkOut = async (req, res) => {
  try {
    const { workerId } = req.body;
    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    // Find today's check-in record without check-out
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const attendance = await Attendance.findOneAndUpdate(
      {
        worker: worker._id,
        checkIn: { $gte: startOfDay, $lt: endOfDay },
        checkOut: null,
      },
      { checkOut: new Date() },
      { new: true }
    ).populate("worker");

    if (!attendance) {
      return res
        .status(404)
        .json({ error: "No active check-in found for today" });
    }

    res.json(attendance);
  } catch (err) {
    console.error("Check-out error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get logs
exports.getLogs = async (req, res) => {
  try {
    // Get today's logs by default
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const logs = await Attendance.find({
      checkIn: { $gte: startOfDay, $lt: endOfDay },
    })
      .populate("worker", "workerId name")
      .sort({ checkIn: -1 });

    // Transform logs to include separate check-in and check-out entries for display
    const transformedLogs = [];

    logs.forEach((log) => {
      // Add check-in entry
      transformedLogs.push({
        _id: log._id + "_in",
        workerId: log.worker.workerId,
        workerName: log.worker.name,
        type: "Check In",
        time: log.checkIn,
        method: log.method,
      });

      // Add check-out entry if exists
      if (log.checkOut) {
        transformedLogs.push({
          _id: log._id + "_out",
          workerId: log.worker.workerId,
          workerName: log.worker.name,
          type: "Check Out",
          time: log.checkOut,
          method: log.method,
        });
      }
    });

    // Sort by time descending
    transformedLogs.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json(transformedLogs);
  } catch (err) {
    console.error("Get logs error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get worker status
exports.getWorkerStatus = async (req, res) => {
  try {
    const { workerId } = req.params;
    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    // Check if worker is currently checked in
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const activeAttendance = await Attendance.findOne({
      worker: worker._id,
      checkIn: { $gte: startOfDay, $lt: endOfDay },
      checkOut: null,
    });

    res.json({
      workerId: worker.workerId,
      name: worker.name,
      isCheckedIn: !!activeAttendance,
      lastCheckIn: activeAttendance?.checkIn || null,
    });
  } catch (err) {
    console.error("Get worker status error:", err);
    res.status(500).json({ error: err.message });
  }
};
