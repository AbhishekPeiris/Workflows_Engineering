import React from "react";

export default function AttendanceTable({ logs }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4 font-semibold text-gray-700">Worker ID</th>
            <th className="text-left p-4 font-semibold text-gray-700">Type</th>
            <th className="text-left p-4 font-semibold text-gray-700">Time</th>
            <th className="text-left p-4 font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-8 text-gray-500">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p>No attendance records for today.</p>
                </div>
              </td>
            </tr>
          ) : (
            logs.map((log, idx) => (
              <tr key={idx} className={`border-t hover:bg-orange-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="p-4 font-medium text-gray-900">{log.workerId}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${log.type === 'Check In'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {log.type === 'Check In' ? '✅ Check In' : '❌ Check Out'}
                  </span>
                </td>
                <td className="p-4 text-gray-700">{new Date(log.time).toLocaleString()}</td>
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
