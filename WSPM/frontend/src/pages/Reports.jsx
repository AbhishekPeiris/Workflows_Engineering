import React, { useState } from "react";
import { generateReport } from "../services/reportService";
import ReportForm from "../components/reports/ReportForm";

export default function Reports() {
  const [topic, setTopic] = useState("");
  const [rows, setRows] = useState([]);

  const handleAddRow = (newTopic, row) => {
    if (!topic) setTopic(newTopic);
    setRows([...rows, row]);
  };

  const handleGenerate = async () => {
    if (!topic || rows.length === 0) return alert("Topic & at least one row required!");
    try {
      await generateReport({ topic, tableData: rows });
      alert("✅ Report generated successfully");
      // Reset form
      setTopic("");
      setRows([]);
    } catch {
      alert("❌ Failed to generate report");
    }
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const calculateSummaryStats = () => {
    if (rows.length === 0) return { avgAttendance: 0, totalPresent: 0, totalAbsent: 0, totalOTHours: 0, avgOTHours: 0 };

    const totalPresent = rows.reduce((sum, row) => sum + parseInt(row.present || 0), 0);
    const totalAbsent = rows.reduce((sum, row) => sum + parseInt(row.absent || 0), 0);
    const totalOTHours = rows.reduce((sum, row) => sum + parseFloat(row.otHours || 0), 0);
    const total = totalPresent + totalAbsent || 1;
    const avgAttendance = ((totalPresent / total) * 100).toFixed(1);
    const avgOTHours = (totalOTHours / rows.length).toFixed(1);

    return { avgAttendance, totalPresent, totalAbsent, totalOTHours: totalOTHours.toFixed(1), avgOTHours };
  };

  const stats = calculateSummaryStats();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="mb-8">
        <div className="p-6 text-white rounded-lg shadow-lg bg-gradient-to-r from-orange-400 to-yellow-400">
          <h1 className="text-3xl font-bold">WORKFLOWS ENGINEERING</h1>
          <p className="mt-1 text-orange-100">Equipment & Tool Management</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="p-6 mb-6 bg-white shadow-lg rounded-xl">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Report Generator</h2>
          <p className="mb-6 text-gray-600">Create custom reports for attendance, performance, and analytics.</p>
        </div>

        {/* Report Form */}
        <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 mr-3 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6.5a1.5 1.5 0 01-3 0V7a1 1 0 10-2 0v4.5A1.5 1.5 0 0111.5 13H10v3a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 8V7a1 1 0 012 0v4a2 2 0 01-2 2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Add Report Data</h3>
          </div>
          <ReportForm onGenerate={handleAddRow} />
        </div>

        {/* Report Preview */}
        {(topic || rows.length > 0) && (
          <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">Report Preview</h3>
            {topic && (
              <div className="p-4 mb-4 rounded-lg bg-blue-50">
                <h4 className="font-semibold text-blue-800">📊 {topic}</h4>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="p-4 font-bold text-left text-gray-700 border-b-2 border-gray-200">Worker ID</th>
                    <th className="p-4 font-bold text-left text-gray-700 border-b-2 border-gray-200">Days Present</th>
                    <th className="p-4 font-bold text-left text-gray-700 border-b-2 border-gray-200">Days Absent</th>
                    <th className="p-4 font-bold text-left text-gray-700 border-b-2 border-gray-200">OT Hours</th>
                    <th className="p-4 font-bold text-left text-gray-700 border-b-2 border-gray-200">Attendance %</th>
                    <th className="p-4 font-bold text-left text-gray-700 border-b-2 border-gray-200">Performance</th>
                    <th className="p-4 font-bold text-left text-gray-700 border-b-2 border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => {
                    const total = parseInt(r.present) + parseInt(r.absent) || 1;
                    const percentage = ((parseInt(r.present) / total) * 100).toFixed(1);
                    const performance = percentage >= 95 ? 'Excellent' : percentage >= 90 ? 'Good' : percentage >= 80 ? 'Average' : 'Poor';
                    const otHours = parseFloat(r.otHours || 0);
                    const avgOTPerDay = parseInt(r.present) > 0 ? (otHours / parseInt(r.present)).toFixed(1) : "0.0";

                    return (
                      <tr key={idx} className={`transition-colors hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="p-4 font-bold text-gray-900 border-b">{r.workerId}</td>
                        <td className="p-4 border-b">
                          <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                            ✅ {r.present}
                          </span>
                        </td>
                        <td className="p-4 border-b">
                          <span className="px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
                            ❌ {r.absent}
                          </span>
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex flex-col items-start">
                            <span className="px-3 py-1 text-sm font-medium text-orange-800 bg-orange-100 rounded-full">
                              ⏰ {otHours}h
                            </span>
                            <span className="mt-1 text-xs text-gray-500">
                              {avgOTPerDay}h/day avg
                            </span>
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div
                                className={`h-2 rounded-full ${percentage >= 90 ? 'bg-green-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className={`font-bold ${percentage >= 90 ? 'text-green-600' : percentage >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 border-b">
                          <span className={`font-medium ${percentage >= 95 ? 'text-green-600' : percentage >= 90 ? 'text-blue-600' : percentage >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {performance}
                          </span>
                        </td>
                        <td className="p-4 border-b">
                          <button
                            onClick={() => removeRow(idx)}
                            className="px-4 py-2 text-sm font-medium text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105"
                          >
                            🗑️ Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan="7" className="p-12 text-center text-gray-500 border-b">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            </svg>
                          </div>
                          <p className="text-lg font-medium">No data added yet</p>
                          <p className="text-sm">Use the form above to add professional report entries with attendance and OT data</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        {rows.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-5">
            <div className="p-4 text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{rows.length}</div>
              <div className="text-sm font-medium text-blue-700">Total Records</div>
            </div>
            <div className="p-4 text-center bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{stats.totalPresent}</div>
              <div className="text-sm font-medium text-green-700">Total Present Days</div>
            </div>
            <div className="p-4 text-center bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
              <div className="text-2xl font-bold text-red-600">{stats.totalAbsent}</div>
              <div className="text-sm font-medium text-red-700">Total Absent Days</div>
            </div>
            <div className="p-4 text-center bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">{stats.totalOTHours}h</div>
              <div className="text-sm font-medium text-orange-700">Total OT Hours</div>
            </div>
            <div className="p-4 text-center bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">{stats.avgAttendance}%</div>
              <div className="text-sm font-medium text-purple-700">Average Attendance</div>
            </div>
          </div>
        )}

        {/* Generate Report Button */}
        {rows.length > 0 && (
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <button
              onClick={handleGenerate}
              className="px-8 py-3 font-medium text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:scale-105"
            >
              📄 Generate PDF Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
