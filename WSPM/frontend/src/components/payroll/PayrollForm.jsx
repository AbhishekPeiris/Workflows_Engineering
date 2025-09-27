import React, { useState } from "react";

export default function PayrollForm({ onGenerate }) {
  const [form, setForm] = useState({
    workerId: "",
    period: "",
    baseRate: "",
    hoursWorked: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.workerId || !form.period || !form.baseRate || !form.hoursWorked) {
      return alert("All fields are required!");
    }
    const totalPay = parseFloat(form.baseRate) * parseFloat(form.hoursWorked);
    onGenerate({ ...form, totalPay });
    setForm({ workerId: "", period: "", baseRate: "", hoursWorked: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Worker ID *</label>
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
          <label className="text-sm font-medium text-gray-700">Period *</label>
          <input
            name="period"
            value={form.period}
            onChange={handleChange}
            placeholder="e.g., 2025-01"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Base Rate (LKR /hour) *</label>
          <input
            name="baseRate"
            type="number"
            value={form.baseRate}
            onChange={handleChange}
            placeholder="Rate per hour"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Hours Worked *</label>
          <input
            name="hoursWorked"
            type="number"
            value={form.hoursWorked}
            onChange={handleChange}
            placeholder="Total hours"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      {form.baseRate && form.hoursWorked && (
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800 font-medium">
            💰 Calculated Pay: LKR {(parseFloat(form.baseRate) * parseFloat(form.hoursWorked)).toLocaleString()}
          </p>
        </div>
      )}

      <button
        type="submit"
        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
      >
        💳 Generate Payroll
      </button>
    </form>
  );
}
