const ShiftSwap = require("../models/ShiftSwap");
const Worker = require("../models/Worker");

// Request shift swap
exports.requestSwap = async (req, res) => {
  try {
    const { workerId, requestedShift, reason } = req.body;
    const worker = await Worker.findOne({ workerId });
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    const swap = await ShiftSwap.create({
      requester: worker._id,
      requestedShift,
      reason,
    });

    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Suggest replacement
exports.suggestReplacement = async (req, res) => {
  try {
    const { swapId } = req.params;

    const swap = await ShiftSwap.findById(swapId).populate("requester");
    if (!swap) return res.status(404).json({ error: "Swap request not found" });

    // Suggest any worker with same role but different shift
    const replacement = await Worker.findOne({
      role: swap.requester.role,
      shiftSchedule: { $ne: swap.requestedShift },
    });

    swap.replacement = replacement?._id || null;
    await swap.save();

    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all shift swaps
exports.getSwaps = async (_req, res) => {
  try {
    const swaps = await ShiftSwap.find().populate("requester replacement");
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
