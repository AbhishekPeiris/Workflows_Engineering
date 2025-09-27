const { sendMail } = require("../config/email");

/**
 * Trigger site alerts or email notifications.
 * For WhatsApp, you can integrate Twilio or Meta WhatsApp API here.
 */

// Alert if quantity > 100
async function sendStockAlert(managerEmail, item, quantity) {
  if (quantity > 100) {
    await sendMail({
      to: managerEmail,
      subject: "Stock Alert",
      text: `⚠️ Alert: ${item} has exceeded safe quantity. Current: ${quantity}kg`,
    });
    console.log("Site Alert: Stock exceeds 100");
  }
}

// Send salary slip again (manual trigger)
async function sendSalarySlip(email, slipPath) {
  await sendMail({
    to: email,
    subject: "Salary Slip",
    text: "Please find attached your salary slip.",
    attachments: [
      {
        filename: "salary-slip.pdf",
        path: slipPath,
      },
    ],
  });
}

module.exports = { sendStockAlert, sendSalarySlip };
