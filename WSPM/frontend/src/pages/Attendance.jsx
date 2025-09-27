import React, { useState, useEffect } from "react";
import { checkIn, checkOut, getLogs } from "../services/attendanceService";
import QRScanner from "../components/attendance/QRScanner";
import AttendanceTable from "../components/attendance/AttendanceTable";

export default function Attendance() {
  const [logs, setLogs] = useState([]);
  const [workerId, setWorkerId] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    } catch {
      alert("❌ Failed to load logs");
    }
  };

  const handleCheckIn = async () => {
    if (!workerId) return alert("Enter Worker ID");
    try {
      await checkIn(workerId);
      alert("✅ Checked In");
      setWorkerId("");
      loadLogs();
    } catch {
      alert("❌ Failed to check in");
    }
  };

  const handleCheckOut = async () => {
    if (!workerId) return alert("Enter Worker ID");
    try {
      await checkOut(workerId);
      alert("✅ Checked Out");
      setWorkerId("");
      loadLogs();
    } catch {
      alert("❌ Failed to check out");
    }
  };

  const handleQRScan = (scannedId) => {
    setWorkerId(scannedId);
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Attendance Management</h2>
          <p className="text-gray-600 mb-6">Track worker check-ins and check-outs with QR scanning or manual entry.</p>
        </div>

        {/* Attendance Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Manual Entry */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manual Entry</h3>
            <div className="space-y-4">
              <input
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                placeholder="Enter Worker ID"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleCheckIn}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  ✅ Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
                >
                  ❌ Check Out
                </button>
              </div>
            </div>
          </div>

          {/* QR Scanner */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">QR Code Scanner</h3>
            <QRScanner onScan={handleQRScan} />
          </div>
        </div>

        {/* Attendance Logs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Today's Attendance Logs</h3>
            <div className="text-sm text-gray-500">
              Total Entries: {logs.length}
            </div>
          </div>
          <AttendanceTable logs={logs} />
        </div>
      </div>
    </div>
  );
}
