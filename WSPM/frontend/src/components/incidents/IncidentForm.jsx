import React, { useState } from "react";

export default function IncidentForm({ onReport }) {
  const [form, setForm] = useState({
    workerId: "",
    description: "",
    severity: "Low",
    location: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.description) return alert("Description required");
    onReport(form);
    setForm({ workerId: "", description: "", severity: "Low", location: "" });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Worker ID</label>
          <input
            name="workerId"
            value={form.workerId}
            onChange={handleChange}
            placeholder="Enter worker ID (if applicable)"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Incident Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Where did this occur?"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Severity Level *</label>
        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
        >
          <option value="Low">🟢 Low - Minor incident, no injury</option>
          <option value="Medium">🟡 Medium - Minor injury or equipment damage</option>
          <option value="High">🔴 High - Serious injury or major damage</option>
          <option value="Critical">🚨 Critical - Life-threatening or catastrophic</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Incident Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the incident in detail..."
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
      >
        🚨 Report Incident
      </button>
    </form>
  );
}
