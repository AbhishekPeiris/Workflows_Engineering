const express = require("express");
const router = express.Router();
const shiftSwapController = require("../controllers/shiftSwapController");

// Shift swap requests
router.post("/", shiftSwapController.requestSwap);
router.get("/", shiftSwapController.getSwaps);

// Suggest replacement for a specific swap
router.put("/:swapId/suggest", shiftSwapController.suggestReplacement);

module.exports = router;
