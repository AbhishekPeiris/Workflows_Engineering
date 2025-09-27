import React from "react";

export default function Loader({ size = "md", text = "Loading..." }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Main Spinner */}
      <div className="relative">
        <div
          className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-200 border-t-transparent`}
        ></div>
        <div
          className={`${sizes[size]} absolute top-0 animate-spin rounded-full border-4 border-transparent border-t-orange-400`}
          style={{
            animationDirection: "reverse",
            animationDuration: "1.5s",
          }}
        ></div>
      </div>

      {/* Loading Text */}
      {text && (
        <p className="mt-4 text-sm font-medium text-gray-600 animate-pulse">
          {text}
        </p>
      )}

      {/* ETM Branding */}
      <div className="mt-2 flex items-center space-x-1">
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
