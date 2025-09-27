import React from "react";

export default function SafetyForm({ onInspect }) {
  const handleInspect = () => {
    const checklist = {
      helmet: true,
      vest: true,
      gloves: false,
      boots: true,
      harness: false,
    };
    onInspect(checklist);
  };

  return (
    <button
      onClick={handleInspect}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Run Safety Inspection
    </button>
  );
}
