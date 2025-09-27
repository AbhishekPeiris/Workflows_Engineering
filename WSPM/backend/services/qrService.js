const QRCode = require("qrcode");
const Worker = require("../models/Worker");

// Generate QR for worker
async function generateWorkerQR(workerId) {
  const qrData = `worker:${workerId}`;
  return await QRCode.toDataURL(qrData);
}

// Validate QR scan
async function validateQR(data) {
  if (!data.startsWith("worker:")) throw new Error("Invalid QR Code");
  const workerId = data.split(":")[1];
  const worker = await Worker.findOne({ workerId });
  if (!worker) throw new Error("Worker not found");
  return worker;
}

module.exports = { generateWorkerQR, validateQR };
