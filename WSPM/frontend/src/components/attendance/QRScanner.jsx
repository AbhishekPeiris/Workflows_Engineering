import React from "react";

// Placeholder for QR scanning (can integrate react-qr-scanner later)
export default function QRScanner({ onScan }) {
  const simulateScan = () => {
    const fakeId = "W001";
    onScan(fakeId);
    alert(`✅ QR scanned for ${fakeId}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
            />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          QR Code Scanner
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Position QR code within the scanner area
        </p>
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300 mb-4">
          <p className="text-gray-500 text-sm">[Camera Scanner Placeholder]</p>
          <p className="text-gray-400 text-xs mt-2">
            Integration with react-qr-scanner pending
          </p>
        </div>
        <button
          onClick={simulateScan}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
        >
          📱 Simulate QR Scan
        </button>
      </div>
    </div>
  );
}
