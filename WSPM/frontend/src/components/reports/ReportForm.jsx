import React, { useState, useEffect } from "react";
import { getWorkers } from "../../services/workerService";

export default function ReportForm({ onGenerate }) {
  const [topic, setTopic] = useState("");
  const [row, setRow] = useState({
    workerId: "",
    present: "",
    absent: "",
    otHours: "",
  });
  const [errors, setErrors] = useState({});
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    async function fetchWorkers() {
      try {
        const data = await getWorkers();
        setWorkers(data);
      } catch (err) {
        setWorkers([]);
      }
    }
    fetchWorkers();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!topic.trim()) {
      newErrors.topic = "Report topic is required";
    } else if (topic.trim().length < 5) {
      newErrors.topic = "Topic should be at least 5 characters long";
    }

    if (!row.workerId.trim()) {
      newErrors.workerId = "Worker selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setRow({ ...row, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleWorkerChange = (value) => {
    setRow({ ...row, workerId: value });
    if (errors.workerId) {
      setErrors({ ...errors, workerId: "" });
    }
  };

  const handleTopicChange = (value) => {
    setTopic(value);
    if (errors.topic) {
      setErrors({ ...errors, topic: "" });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onGenerate(topic, {
      ...row,
      present: row.present || "0",
      absent: row.absent || "0",
      otHours: row.otHours || "0",
    });

    setRow({ workerId: "", present: "", absent: "", otHours: "" });
    setErrors({});
  };

  const calculateMetrics = () => {
    const present = parseInt(row.present) || 0;
    const absent = parseInt(row.absent) || 0;
    const otHours = parseFloat(row.otHours) || 0;
    const total = present + absent;

    if (total === 0) return null;

    const attendancePercentage = ((present / total) * 100).toFixed(1);
    const avgOTPerDay = present > 0 ? (otHours / present).toFixed(1) : "0.0";

    return {
      attendancePercentage,
      avgOTPerDay,
      totalOTHours: otHours.toFixed(1),
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-8">
      {/* Report Topic Section */}
      <div className="p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h4
          className="flex items-center mb-4 text-lg font-bold text-gray-800"
          style={{
            fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
          }}
        >
          <span className="p-2 mr-3 text-white bg-blue-500 rounded-lg">📊</span>
          Report Configuration
        </h4>
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">
            Report Topic *
          </label>
          <input
            value={topic}
            onChange={(e) => handleTopicChange(e.target.value)}
            placeholder="Enter professional report topic (e.g., Monthly Attendance & OT Summary - December 2024)"
            className={`w-full border-2 rounded-xl p-4 text-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all font-medium ${errors.topic
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-white"
              }`}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          />
          {errors.topic && (
            <p className="flex items-center text-sm font-medium text-red-600">
              <span className="mr-1">⚠️</span>
              {errors.topic}
            </p>
          )}
          <p className="text-sm text-gray-500">
            This will appear as the main heading in your professional PDF report
          </p>
        </div>
      </div>

      {/* Data Entry Form */}
      <form onSubmit={submit} className="space-y-6">
        <div className="p-6 border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
          <h4
            className="flex items-center mb-6 text-lg font-bold text-gray-800"
            style={{
              fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
            }}
          >
            <span className="p-2 mr-3 text-white bg-green-500 rounded-lg">👤</span>
            Employee Data Entry
          </h4>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Worker ID Dropdown */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Worker *
              </label>
              <select
                value={row.workerId}
                onChange={(e) => handleWorkerChange(e.target.value)}
                className={`w-full border-2 rounded-xl p-4 focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all font-medium ${errors.workerId
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 bg-white"
                  }`}
              >
                <option value="">Select worker...</option>
                {workers.map((w) => (
                  <option key={w.id || w.workerId} value={w.id || w.workerId}>
                    {w.workerId || w.id} - {w.name}
                  </option>
                ))}
              </select>
              {errors.workerId && (
                <p className="flex items-center text-sm font-medium text-red-600">
                  <span className="mr-1">⚠️</span>
                  {errors.workerId}
                </p>
              )}
            </div>

            {/* Days Present */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Days Present
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={row.present}
                  onChange={(e) => handleInputChange("present", e.target.value)}
                  placeholder="Number of days present"
                  min="0"
                  max="31"
                  className={`w-full border-2 rounded-xl p-4 focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all font-medium pl-12 ${errors.present
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-white"
                    }`}
                />
                <span className="absolute font-bold text-green-500 left-4 top-4">
                  ✅
                </span>
              </div>
              {errors.present && (
                <p className="flex items-center text-sm font-medium text-red-600">
                  <span className="mr-1">⚠️</span>
                  {errors.present}
                </p>
              )}
            </div>

            {/* Days Absent */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Days Absent
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={row.absent}
                  onChange={(e) => handleInputChange("absent", e.target.value)}
                  placeholder="Number of days absent"
                  min="0"
                  max="31"
                  className={`w-full border-2 rounded-xl p-4 focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all font-medium pl-12 ${errors.absent
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-white"
                    }`}
                />
                <span className="absolute font-bold text-red-500 left-4 top-4">
                  ❌
                </span>
              </div>
              {errors.absent && (
                <p className="flex items-center text-sm font-medium text-red-600">
                  <span className="mr-1">⚠️</span>
                  {errors.absent}
                </p>
              )}
            </div>

            {/* OT Hours */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                OT Hours
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={row.otHours}
                  onChange={(e) => handleInputChange("otHours", e.target.value)}
                  placeholder="Overtime hours worked"
                  min="0"
                  max="200"
                  className={`w-full border-2 rounded-xl p-4 focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all font-medium pl-12 ${errors.otHours
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 bg-white"
                    }`}
                />
                <span className="absolute font-bold text-orange-500 left-4 top-4">
                  ⏰
                </span>
              </div>
              {errors.otHours && (
                <p className="flex items-center text-sm font-medium text-red-600">
                  <span className="mr-1">⚠️</span>
                  {errors.otHours}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Enter total overtime hours (decimals allowed, e.g., 8.5)
              </p>
            </div>
          </div>

          {/* Metrics Preview */}
          {metrics && (
            <div className="p-4 mt-6 bg-white border-2 border-blue-200 rounded-xl">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="text-center">
                  <span className="block font-bold text-gray-700">
                    Attendance:
                  </span>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-16 h-3 bg-gray-200 rounded-full">
                      <div
                        className={`h-3 rounded-full ${metrics.attendancePercentage >= 90
                          ? "bg-green-500"
                          : metrics.attendancePercentage >= 80
                            ? "bg-yellow-500"
                            : "bg-red-500"
                          }`}
                        style={{ width: `${metrics.attendancePercentage}%` }}
                      ></div>
                    </div>
                    <span
                      className={`font-bold text-lg ${metrics.attendancePercentage >= 90
                        ? "text-green-600"
                        : metrics.attendancePercentage >= 80
                          ? "text-yellow-600"
                          : "text-red-600"
                        }`}
                    >
                      {metrics.attendancePercentage}%
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <span className="block font-bold text-gray-700">
                    Total OT Hours:
                  </span>
                  <span className="text-lg font-bold text-orange-600">
                    {metrics.totalOTHours}h
                  </span>
                </div>

                <div className="text-center">
                  <span className="block font-bold text-gray-700">
                    Avg OT/Day:
                  </span>
                  <span className="text-lg font-bold text-purple-600">
                    {metrics.avgOTPerDay}h
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!topic.trim() || !row.workerId.trim()}
            className="flex items-center px-8 py-4 space-x-3 text-lg font-bold text-white transition-all transform shadow-2xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 rounded-xl hover:scale-105 disabled:cursor-not-allowed disabled:transform-none"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            <span>📊 Add Professional Report Entry</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="space-y-2 text-sm text-center text-gray-500">
          <p>
            💡 <strong>Pro Tip:</strong> Fill in all fields including OT hours for
            comprehensive reporting
          </p>
          <p>
            🎯 Each entry will be included in your professional PDF report with
            attendance and overtime analysis
          </p>
        </div>
      </form>
    </div>
  );
}
