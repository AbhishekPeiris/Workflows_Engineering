const Payroll = require("../models/Payroll");
const Worker = require("../models/Worker");
const { sendMail } = require("../config/email");

// Auto wage calculation & slip email
async function generatePayroll(workerId, period, baseRate, hoursWorked) {
  const worker = await Worker.findOne({ workerId });
  if (!worker) throw new Error("Worker not found");

  const totalPay = baseRate * hoursWorked;

  const payroll = await Payroll.create({
    worker: worker._id,
    period,
    baseRate,
    hoursWorked,
    totalPay,
    status: "Pending",
  });

  // Auto-send salary slip via email
  if (worker.contact?.email) {
    await sendMail({
      to: worker.contact.email,
      subject: `Salary Slip - ${period}`,
      text: `Hello ${worker.name},\n\nYour salary for ${period} is ${totalPay}.\n\nThank you.`,
    });
  }

  return payroll;
}

module.exports = { generatePayroll };
