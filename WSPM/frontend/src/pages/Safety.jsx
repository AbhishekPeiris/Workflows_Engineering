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
    harness: false,
    issues: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadInspections();
  }, []);

  const loadInspections = async () => {
    try {
      const data = await getInspections();
      console.log("Loaded inspections:", data);
      setInspections(data || []);
    } catch (error) {
      console.error("Failed to load inspections:", error);
      alert("❌ Failed to load safety inspections: " + (error.response?.data?.error || error.message));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.workerId?.trim()) {
      newErrors.workerId = "Worker ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, checked, value, type } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setForm({ ...form, [name]: fieldValue });

    // Clear error for this field when user starts typing/checking
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("⚠️ Please fix the validation errors before submitting");
      return;
    }

    setLoading(true);
    try {
      const inspectionData = {
        workerId: form.workerId.trim(),
        helmet: form.helmet,
        vest: form.vest,
        gloves: form.gloves,
        boots: form.boots,
        harness: form.harness,
        issues: form.issues.trim()
      };

      console.log("Submitting safety inspection:", inspectionData);

      await createInspection(inspectionData);
      alert("✅ Safety inspection recorded successfully");

      // Reset form
      setForm({
        workerId: "",
        helmet: false,
        vest: false,
        gloves: false,
        boots: false,
        harness: false,
        issues: ""
      });
      setErrors({});

      // Reload inspections
      await loadInspections();

    } catch (error) {
      console.error("Safety inspection submission failed:", error);
      const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred";
      alert("❌ Failed to record safety inspection: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const calculateFormScore = () => {
    const checkedItems = [form.helmet, form.vest, form.gloves, form.boots, form.harness].filter(Boolean).length;
    return Math.round((checkedItems / 5) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
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

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Worker ID *</label>
              <input
                name="workerId"
                placeholder="Enter worker ID (e.g., W001)"
                value={form.workerId}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${errors.workerId ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.workerId && <p className="text-red-500 text-xs">{errors.workerId}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">Safety Equipment Check</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {safetyItems.map((item) => (
                  <label key={item.key} className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors cursor-pointer ${form[item.key] ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}>
                    <input
                      type="checkbox"
                      name={item.key}
                      checked={form[item.key]}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.label}</span>
                    {form[item.key] && <span className="ml-auto text-green-600">✓</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Live Score Preview */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 font-medium">Current Compliance Score</p>
                  <p className="text-blue-600 text-sm">Based on selected safety equipment</p>
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(calculateFormScore())}`}>
                  {calculateFormScore()}%
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                name="issues"
                placeholder="Any issues or observations about the safety equipment..."
                value={form.issues}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Recording..." : "🛡️ Record Safety Inspection"}
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
              inspections.map((inspection, index) => (
                <div key={inspection._id} className={`p-6 rounded-lg border ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">🛡️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {inspection.workerName || 'Unknown Worker'} ({inspection.workerId})
                        </h4>
                        <p className="text-sm text-gray-600">
                          Inspection Date: {new Date(inspection.createdAt || inspection.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getScoreColor(inspection.complianceScore)}`}>
                        {inspection.complianceScore}%
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBadgeColor(inspection.complianceScore)}`}>
                        {inspection.passedItems || 0}/{inspection.totalItems || 5} items
                      </span>
                    </div>
                  </div>

                  {/* Safety Equipment Status */}
                  {inspection.checklist && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                      {safetyItems.map((item) => (
                        <div key={item.key} className={`flex items-center space-x-2 p-2 rounded ${inspection.checklist[item.key] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          <span className="text-sm">{item.icon}</span>
                          <span className="text-xs font-medium">{item.label}</span>
                          <span className="ml-auto">
                            {inspection.checklist[item.key] ? '✓' : '✗'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Issues/Notes */}
                  {inspection.issues && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-yellow-800 text-sm">
                        <strong>Notes:</strong> {inspection.issues}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
