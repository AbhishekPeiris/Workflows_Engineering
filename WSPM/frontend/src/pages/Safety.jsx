import React, { useState, useEffect } from "react";
import { createInspection, getInspections } from "../services/safetyService";

export default function Safety() {
  const [inspections, setInspections] = useState([]);
  const [form, setForm] = useState({
    workerId: "",
    helmet: false,
    vest: false,
    gloves: false,
    boots: false,
    harness: false
  });

  useEffect(() => {
    loadInspections();
  }, []);

  const loadInspections = async () => {
    try {
      const data = await getInspections();
      setInspections(data);
    } catch {
      alert("❌ Failed to load inspections");
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  };

  const handleSubmit = async () => {
    if (!form.workerId) return alert("Worker ID required!");
    try {
      await createInspection(form);
      alert("✅ Safety inspection logged");
      setForm({ workerId: "", helmet: false, vest: false, gloves: false, boots: false, harness: false });
      loadInspections();
    } catch {
      alert("❌ Failed to log inspection");
    }
  };

  const safetyItems = [
    { key: "helmet", label: "Safety Helmet", icon: "🪖" },
    { key: "vest", label: "Safety Vest", icon: "🦺" },
    { key: "gloves", label: "Safety Gloves", icon: "🧤" },
    { key: "boots", label: "Safety Boots", icon: "🥾" },
    { key: "harness", label: "Safety Harness", icon: "🔗" }
  ];

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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Safety Inspections</h2>
          <p className="text-gray-600 mb-6">Conduct safety equipment inspections and track compliance scores.</p>
        </div>

        {/* Safety Inspection Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Conduct Safety Inspection</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Worker ID *</label>
              <input
                name="workerId"
                placeholder="Enter worker ID"
                value={form.workerId}
                onChange={(e) => setForm({ ...form, workerId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Safety Equipment Check</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {safetyItems.map((item) => (
                  <label key={item.key} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      name={item.key}
                      checked={form[item.key]}
                      onChange={handleChange}
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              🛡️ Submit Inspection
            </button>
          </div>
        </div>

        {/* Safety Inspection Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Inspection History</h3>
            <div className="text-sm text-gray-500">
              Total Inspections: {inspections.length}
            </div>
          </div>

          <div className="space-y-4">
            {inspections.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p>No safety inspections recorded yet.</p>
                </div>
              </div>
            ) : (
              inspections.map((i, index) => (
                <div key={i._id} className={`p-4 rounded-lg border ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">🛡️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Worker {i.workerId}</h4>
                        <p className="text-sm text-gray-600">Inspection Date: {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${i.complianceScore >= 80 ? 'text-green-600' : i.complianceScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {i.complianceScore}%
                      </div>
                      <p className="text-xs text-gray-500">Compliance Score</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
