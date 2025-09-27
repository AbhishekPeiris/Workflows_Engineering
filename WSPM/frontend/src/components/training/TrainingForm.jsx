import React, { useState } from "react";

export default function TrainingForm({ onSave }) {
  const [form, setForm] = useState({
    workerId: "",
    trainingName: "",
    badge: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.trainingName) return alert("Training required");
    onSave(form);
    setForm({ workerId: "", trainingName: "", badge: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Worker ID</label>
          <input
            name="workerId"
            value={form.workerId}
            onChange={handleChange}
            placeholder="Enter worker ID"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Training Name *
          </label>
          <input
            name="trainingName"
            value={form.trainingName}
            onChange={handleChange}
            placeholder="Enter training name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Badge/Certificate
          </label>
          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="Badge or certificate"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-500 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg"
      >
        🎓 Record Training
      </button>
    </form>
  );
}
