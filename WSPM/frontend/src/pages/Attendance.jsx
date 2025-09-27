import React, { useState, useEffect } from "react";
import {
  checkIn,
  checkOut,
  getLogs,
  getWorkerStatus,
} from "../services/attendanceService";
import QRScanner from "../components/attendance/QRScanner";
import AttendanceTable from "../components/attendance/AttendanceTable";

export default function Attendance() {
  const [logs, setLogs] = useState([]);
  const [workerId, setWorkerId] = useState("");
  const [workerStatus, setWorkerStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    if (workerId.trim()) {
      checkWorkerStatus(workerId.trim());
    } else {
      setWorkerStatus(null);
    }
  }, [workerId]);

  const loadLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    } catch (err) {
      console.error("Failed to load logs:", err);
      alert("❌ Failed to load logs");
    }
  };

  const checkWorkerStatus = async (id) => {
    try {
      const status = await getWorkerStatus(id);
      setWorkerStatus(status);
    } catch (err) {
      setWorkerStatus(null);
    }
  };

  const handleCheckIn = async (method = "Manual") => {
    if (!workerId.trim()) return alert("⚠️ Please enter Worker ID");

    setLoading(true);
    try {
      await checkIn(workerId.trim(), method);
      alert("✅ Worker checked in successfully");
      setWorkerId("");
      setWorkerStatus(null);
      loadLogs();
    } catch (err) {
      console.error("Check-in failed:", err);
      alert(`❌ Check-in failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (method = "Manual") => {
    if (!workerId.trim()) return alert("⚠️ Please enter Worker ID");

    setLoading(true);
    try {
      await checkOut(workerId.trim(), method);
      alert("✅ Worker checked out successfully");
      setWorkerId("");
      setWorkerStatus(null);
      loadLogs();
    } catch (err) {
      console.error("Check-out failed:", err);
      alert(`❌ Check-out failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleQRScan = async (scannedId) => {
    setWorkerId(scannedId);

    // Auto check-in/check-out based on current status
    try {
      const status = await getWorkerStatus(scannedId);

      if (status.isCheckedIn) {
        // Worker is checked in, so check them out
        await handleCheckOut("QR");
      } else {
        // Worker is not checked in, so check them in
        await handleCheckIn("QR");
      }
    } catch (err) {
      console.error("QR scan processing failed:", err);
      alert("❌ Failed to process QR scan. Please try manual entry.");
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Attendance Management
          </h2>
          <p className="text-gray-600 mb-6">
            Track worker check-ins and check-outs with QR scanning or manual
            entry.
          </p>
        </div>

        {/* Attendance Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Manual Entry */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Manual Entry
            </h3>
            <div className="space-y-4">
              <div>
                <input
                  value={workerId}
                  onChange={(e) => setWorkerId(e.target.value)}
                  placeholder="Enter Worker ID (e.g., W001)"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />

                {/* Worker Status Display */}
                {workerStatus && (
                  <div
                    className={`mt-2 p-3 rounded-lg ${
                      workerStatus.isCheckedIn
                        ? "bg-green-50 border border-green-200"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {workerStatus.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Status:{" "}
                          {workerStatus.isCheckedIn ? (
                            <span className="text-green-600 font-medium">
                              Checked In
                            </span>
                          ) : (
                            <span className="text-blue-600 font-medium">
                              Available
                            </span>
                          )}
                        </p>
                        {workerStatus.isCheckedIn &&
                          workerStatus.lastCheckIn && (
                            <p className="text-xs text-gray-500">
                              Since:{" "}
                              {new Date(
                                workerStatus.lastCheckIn
                              ).toLocaleTimeString()}
                            </p>
                          )}
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          workerStatus.isCheckedIn
                            ? "bg-green-400"
                            : "bg-blue-400"
                        }`}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleCheckIn()}
                  disabled={loading || workerStatus?.isCheckedIn}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Processing..." : "✅ Check In"}
                </button>
                <button
                  onClick={() => handleCheckOut()}
                  disabled={loading || !workerStatus?.isCheckedIn}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? "Processing..." : "❌ Check Out"}
                </button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                {workerStatus?.isCheckedIn
                  ? "Worker is currently checked in. Click Check Out to end shift."
                  : "Worker is available. Click Check In to start shift."}
              </div>
            </div>
          </div>

          {/* QR Scanner */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              QR Code Scanner
            </h3>
            <QRScanner onScan={handleQRScan} />
          </div>
        </div>

        {/* Attendance Logs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Today's Attendance Logs
            </h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={loadLogs}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                🔄 Refresh
              </button>
              <div className="text-sm text-gray-500">
                Total Entries: {logs.length}
              </div>
            </div>
          </div>
          <AttendanceTable logs={logs} />
        </div>
      </div>
    </div>
  );
}
