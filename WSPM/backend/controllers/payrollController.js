const Payroll = require("../models/Payroll");
const Worker = require("../models/Worker");
const { sendMail } = require("../config/email");

// Generate payroll record
exports.generatePayroll = async (req, res) => {
  try {
    const { workerId, period, baseRate, hoursWorked } = req.body;

    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    const totalPay = baseRate * hoursWorked;

    const payroll = await Payroll.create({
      worker: worker._id,
      period,
      baseRate,
      hoursWorked,
      totalPay,
    });

    // Auto-email salary slip
    if (worker.contact?.email) {
      await sendMail({
        to: worker.contact.email,
        subject: `Salary Slip - ${period}`,
        text: `Your salary for ${period} is ${totalPay}.`,
      });
    }

    res.json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payrolls
exports.getPayrolls = async (_req, res) => {
  try {
    const list = await Payroll.find().populate("worker");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
