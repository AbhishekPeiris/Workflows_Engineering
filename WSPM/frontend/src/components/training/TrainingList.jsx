import React from "react";

export default function TrainingList({ trainings }) {
  return (
    <div className="space-y-4">
      {trainings.length === 0 ? (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 text-gray-300 mb-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <p>No training records found.</p>
          </div>
        </div>
      ) : (
        trainings.map((t, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🎓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {t.trainingName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Worker ID: {t.workerId}
                  </p>
                  {t.badge && (
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                      {t.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
