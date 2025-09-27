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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Generator</h2>
          <p className="text-gray-600 mb-6">Create custom reports for attendance, performance, and analytics.</p>
        </div>

        {/* Report Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-lg mr-3">
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
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Report Preview</h3>
            {topic && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">📊 {topic}</h4>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-700 border">Worker ID</th>
                    <th className="text-left p-4 font-semibold text-gray-700 border">Days Present</th>
                    <th className="text-left p-4 font-semibold text-gray-700 border">Days Absent</th>
                    <th className="text-left p-4 font-semibold text-gray-700 border">Attendance %</th>
                    <th className="text-left p-4 font-semibold text-gray-700 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => {
                    const total = parseInt(r.present) + parseInt(r.absent) || 1;
                    const percentage = ((parseInt(r.present) / total) * 100).toFixed(1);
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4 border font-medium">{r.workerId}</td>
                        <td className="p-4 border text-green-600">{r.present}</td>
                        <td className="p-4 border text-red-600">{r.absent}</td>
                        <td className="p-4 border">
                          <span className={`px-2 py-1 rounded-full text-sm ${percentage >= 90 ? 'bg-green-100 text-green-800' : percentage >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {percentage}%
                          </span>
                        </td>
                        <td className="p-4 border">
                          <button
                            onClick={() => removeRow(idx)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500 border">
                        No data added yet. Use the form above to add report entries.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Generate Report Button */}
        {rows.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <button
              onClick={handleGenerate}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
            >
              📄 Generate PDF Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
