import React, { useState } from "react";

export default function ShiftForm({ onRequest }) {
  const [form, setForm] = useState({
    workerId: "",
    requestedShift: "",
    reason: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.workerId || !form.requestedShift) {
      return alert("Worker ID and Requested Shift are required!");
    }
    onRequest(form);
    setForm({ workerId: "", requestedShift: "", reason: "" });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Worker ID *
          </label>
          <input
            name="workerId"
            value={form.workerId}
            onChange={handleChange}
            placeholder="Enter worker ID"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Requested Shift *
          </label>
          <select
            name="requestedShift"
            value={form.requestedShift}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          >
            <option value="">Select shift</option>
            <option value="Morning (6 AM - 2 PM)">
              Morning (6 AM - 2 PM)
            </option>
            <option value="Afternoon (2 PM - 10 PM)">
              Afternoon (2 PM - 10 PM)
            </option>
            <option value="Night (10 PM - 6 AM)">Night (10 PM - 6 AM)</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Reason for Shift Change
        </label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Explain why you need this shift change..."
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
      >
        🔄 Request Shift Change
      </button>
    </form>
  );
}
