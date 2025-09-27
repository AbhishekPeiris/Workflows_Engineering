import React, { useState, useEffect } from "react";
import { generatePayroll, getPayrolls } from "../services/payrollService";

export default function Payroll() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ workerId: "", period: "", baseRate: "", hoursWorked: "" });

  useEffect(() => {
    loadPayrolls();
  }, []);

  const loadPayrolls = async () => {
    try {
      const data = await getPayrolls();
      setRecords(data);
    } catch {
      alert("❌ Failed to load payrolls");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    if (!form.workerId || !form.period || !form.baseRate || !form.hoursWorked) {
      return alert("All fields are required!");
    }
    try {
      await generatePayroll(form);
      alert("✅ Payroll Generated");
      setForm({ workerId: "", period: "", baseRate: "", hoursWorked: "" });
      loadPayrolls();
    } catch {
      alert("❌ Failed to generate payroll");
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payroll Management</h2>
          <p className="text-gray-600 mb-6">Generate and manage worker payroll records with automated calculations.</p>
        </div>

        {/* Payroll Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Generate Payroll</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Worker ID *</label>
              <input
                name="workerId"
                value={form.workerId}
                onChange={handleChange}
                placeholder="Enter worker ID"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
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
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Base Rate (₹/hour) *</label>
              <input
                name="baseRate"
                type="number"
                value={form.baseRate}
                onChange={handleChange}
                placeholder="Rate per hour"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
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
              />
            </div>
          </div>

          {form.baseRate && form.hoursWorked && (
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-green-800 font-medium">
                💰 Calculated Pay: ₹{(parseFloat(form.baseRate) * parseFloat(form.hoursWorked)).toLocaleString()}
              </p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            💳 Generate Payroll
          </button>
        </div>

        {/* Payroll Records */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Payroll Records</h3>
            <p className="text-gray-600 text-sm mt-1">Total Records: {records.length}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">Worker ID</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Period</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Hours</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Rate</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Total Pay</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                        <p>No payroll records found. Generate your first payroll to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  records.map((r, index) => (
                    <tr key={r._id} className={`border-t hover:bg-orange-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="p-4 font-medium text-gray-900">{r.workerId}</td>
                      <td className="p-4 text-gray-700">{r.period}</td>
                      <td className="p-4 text-gray-700">{r.hoursWorked} hrs</td>
                      <td className="p-4 text-gray-700">₹{r.baseRate}/hr</td>
                      <td className="p-4 font-semibold text-green-600">₹{r.totalPay?.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
