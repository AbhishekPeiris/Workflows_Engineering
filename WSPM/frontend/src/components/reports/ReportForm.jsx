import React, { useState } from "react";

export default function ReportForm({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [row, setRow] = useState({ workerId: "", present: "", absent: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!topic || !row.workerId)
      return alert("Report topic and Worker ID are required!");
    onGenerate(topic, row);
    setRow({ workerId: "", present: "", absent: "" });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Report Topic *
        </label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter report topic (e.g., Monthly Attendance Summary)"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Worker ID *</label>
          <input
            value={row.workerId}
            onChange={(e) => setRow({ ...row, workerId: e.target.value })}
            placeholder="Enter worker ID"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Days Present
          </label>
          <input
            type="number"
            value={row.present}
            onChange={(e) => setRow({ ...row, present: e.target.value })}
            placeholder="Number of days present"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Days Absent
          </label>
          <input
            type="number"
            value={row.absent}
            onChange={(e) => setRow({ ...row, absent: e.target.value })}
            placeholder="Number of days absent"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
      >
        📊 Add Report Entry
      </button>
    </form>
  );
}
