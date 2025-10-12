import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, message: "New safety incident reported", time: "5 min ago", type: "alert" },
    { id: 2, message: "Payroll processing completed", time: "1 hour ago", type: "success" },
    { id: 3, message: "Training session scheduled", time: "2 hours ago", type: "info" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg shadow-md bg-gradient-to-r from-orange-400 to-yellow-400">
            <span className="text-xl font-bold text-white">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">WORKFLOWS ENGINEERING</h1>
            <p className="text-sm text-gray-500">Equipment & Tool Management</p>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search workers, reports, incidents..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div> */}

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9.09c0-2.83-2.17-5.09-5-5.09S5 6.26 5 9.09V12l-5 5h5c0 2.76 2.24 5 5 5s5-2.24 5-5z" />
              </svg>
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                {notifications.length}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-xl top-12 w-80">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="overflow-y-auto max-h-64">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="mt-1 text-xs text-gray-500">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center p-2 space-x-3 transition-colors rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400">
                <span className="text-sm font-medium text-white">A</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showProfile && (
              <div className="absolute right-0 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-xl top-12">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Account</a>
                  <div className="pt-2 mt-2 border-t border-gray-100">
                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
