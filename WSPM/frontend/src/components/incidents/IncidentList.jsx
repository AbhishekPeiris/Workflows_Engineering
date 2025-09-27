import React from "react";

export default function IncidentList({ incidents }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      case 'Critical': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'Low': return '🟢';
      case 'Medium': return '🟡';
      case 'High': return '🔴';
      case 'Critical': return '🚨';
      default: return '⚪';
    }
  };

  return (
    <div className="space-y-4">
      {incidents.length === 0 ? (
        <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg">
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>No incidents reported. Great safety record!</p>
          </div>
        </div>
      ) : (
        incidents.map((i, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🚨</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(i.severity)}`}>
                      {getSeverityIcon(i.severity)} {i.severity}
                    </span>
                    {i.workerId && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        Worker: {i.workerId}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {i.date ? new Date(i.date).toLocaleDateString() : new Date().toLocaleDateString()}
                    {i.location && ` • ${i.location}`}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-800 mb-3">{i.desc || i.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Reported on {new Date().toLocaleTimeString()}</span>
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
