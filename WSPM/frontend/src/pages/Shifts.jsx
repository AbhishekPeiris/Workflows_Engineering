import React, { useState, useEffect } from "react";
import { requestShiftSwap, getShiftSwaps, suggestReplacement } from "../services/shiftService";
import ShiftForm from "../components/shift/ShiftForm";
import ShiftList from "../components/shift/ShiftList";

export default function Shifts() {
  const [swaps, setSwaps] = useState([]);

  useEffect(() => {
    loadSwaps();
  }, []);

  const loadSwaps = async () => {
    try {
      const data = await getShiftSwaps();
      setSwaps(data);
    } catch {
      alert("❌ Failed to load shift swaps");
    }
  };

  const handleShiftRequest = async (requestData) => {
    try {
      await requestShiftSwap(requestData);
      alert("✅ Shift swap requested successfully");
      loadSwaps();
    } catch {
      alert("❌ Failed to request swap");
    }
  };

  const handleSuggest = async (id) => {
    try {
      await suggestReplacement(id);
      alert("✅ Replacement suggested");
      loadSwaps();
    } catch {
      alert("❌ Failed to suggest replacement");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">WORKFLOWS ENGINEERING</h1>
          <p className="text-orange-100 mt-1">Equipment & Tool Management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Shift Management</h2>
          <p className="text-gray-600 mb-6">Manage shift swaps, requests, and schedule adjustments.</p>
        </div>

        {/* Shift Request Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Request Shift Swap</h3>
          <ShiftForm onRequest={handleShiftRequest} />
        </div>

        {/* Shift Requests List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Shift Swap Requests</h3>
          <ShiftList swaps={swaps} onSuggest={handleSuggest} />
        </div>
      </div>
    </div>
  );
}
