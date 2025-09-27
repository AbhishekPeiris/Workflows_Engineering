const Worker = require("../models/Worker");

// Compliance scoring based on gear checklist
function calculateComplianceScore(checklist) {
  // 5 items → each worth 20 points
  const totalItems = Object.keys(checklist).length;
  const goodItems = Object.values(checklist).filter(Boolean).length;
  return Math.round((goodItems / totalItems) * 100);
}

async function updateWorkerCompliance(workerId, checklist) {
  const worker = await Worker.findOne({ workerId });
  if (!worker) throw new Error("Worker not found");

  worker.complianceScore = calculateComplianceScore(checklist);
  await worker.save();

  return worker.complianceScore;
}

module.exports = { calculateComplianceScore, updateWorkerCompliance };
