import React from "react";

export default function WorkerList({ workers }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
        <h3 className="text-xl font-semibold text-gray-800">Workers Directory</h3>
        <p className="text-gray-600 text-sm mt-1">Total Workers: {workers.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Worker ID</th>
              <th className="text-left p-4 font-semibold text-gray-700">Name</th>
              <th className="text-left p-4 font-semibold text-gray-700">Role</th>
              <th className="text-left p-4 font-semibold text-gray-700">Phone</th>
            </tr>
          </thead>
          <tbody>
            {workers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-8 text-gray-500">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    <p>No workers found. Add your first worker to get started.</p>
                  </div>
                </td>
              </tr>
            ) : (
              workers.map((w, idx) => (
                <tr key={idx} className={`border-t hover:bg-orange-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="p-4 font-medium text-gray-900">{w.workerId}</td>
                  <td className="p-4 text-gray-800">{w.name}</td>
                  <td className="p-4">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                      {w.role || "N/A"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{w.phone || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
