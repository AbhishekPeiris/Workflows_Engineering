const Payroll = require("../models/Payroll");
const Worker = require("../models/Worker");

// Generate payroll record
exports.generatePayroll = async (req, res) => {
  try {
    const { workerId, period, baseRate, hoursWorked } = req.body;

    console.log("Payroll generation request:", { workerId, period, baseRate, hoursWorked });

    // Validate required fields
    if (!workerId || !period || !baseRate || !hoursWorked) {
      return res.status(400).json({ error: "All fields (workerId, period, baseRate, hoursWorked) are required" });
    }

    // Find worker by workerId
    const worker = await Worker.findOne({ workerId: workerId.trim() });
    if (!worker) {
      return res.status(404).json({ error: `Worker with ID ${workerId} not found` });
    }

    // Check if payroll already exists for this worker and period
    const existingPayroll = await Payroll.findOne({
      worker: worker._id,
      period: period.trim()
    });

    if (existingPayroll) {
      return res.status(400).json({ error: `Payroll already exists for worker ${workerId} in period ${period}` });
    }

    // Calculate total pay
    const totalPay = parseFloat(baseRate) * parseFloat(hoursWorked);

    // Create payroll record
    const payroll = await Payroll.create({
      worker: worker._id,
      period: period.trim(),
      baseRate: parseFloat(baseRate),
      hoursWorked: parseFloat(hoursWorked),
      totalPay: totalPay,
      status: "Pending"
    });

    // Return payroll with populated worker data
    const populatedPayroll = await Payroll.findById(payroll._id)
      .populate('worker', 'workerId name contact');

    console.log("Payroll created successfully:", populatedPayroll);
    res.json(populatedPayroll);

  } catch (err) {
    console.error("Payroll generation error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all payrolls
exports.getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find()
      .populate('worker', 'workerId name contact role')
      .sort({ createdAt: -1 });

    // Transform data to include workerId at the root level for easier access
    const transformedPayrolls = payrolls.map(payroll => ({
      _id: payroll._id,
      workerId: payroll.worker?.workerId || 'N/A',
      workerName: payroll.worker?.name || 'Unknown',
      period: payroll.period,
      baseRate: payroll.baseRate,
      hoursWorked: payroll.hoursWorked,
      totalPay: payroll.totalPay,
      status: payroll.status,
      createdAt: payroll.createdAt,
      worker: payroll.worker // Keep the full worker object if needed
    }));

    console.log("Payrolls retrieved:", transformedPayrolls.length);
    res.json(transformedPayrolls);

  } catch (err) {
    console.error("Get payrolls error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get payroll by ID
exports.getPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id)
      .populate('worker', 'workerId name contact role');

    if (!payroll) {
      return res.status(404).json({ error: "Payroll record not found" });
    }

    res.json(payroll);
  } catch (err) {
    console.error("Get payroll error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update payroll status
exports.updatePayrollStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Paid'].includes(status)) {
      return res.status(400).json({ error: "Status must be either 'Pending' or 'Paid'" });
    }

    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('worker', 'workerId name contact');

    if (!payroll) {
      return res.status(404).json({ error: "Payroll record not found" });
    }

    res.json(payroll);
  } catch (err) {
    console.error("Update payroll status error:", err);
    res.status(500).json({ error: err.message });
  }
};
