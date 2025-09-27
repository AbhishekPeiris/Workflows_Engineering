import React from "react";

export default function ShiftList({ swaps, onSuggest }) {
  return (
    <div className="space-y-4">
      {swaps.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          <p>No shift swap requests found.</p>
        </div>
      ) : (
        swaps.map((s, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border"
          >
            <div>
              <p className="font-medium text-gray-800">
                Worker {s.workerId} requested {s.requestedShift}
              </p>
              <p className="text-sm text-gray-600">{s.reason}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${s.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : s.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
              >
                {s.status}
              </span>
            </div>
            {s.status === "Pending" && onSuggest && (
              <button
                onClick={() => onSuggest(s._id)}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
              >
                Suggest Replacement
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
