import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/", name: "Dashboard", icon: "📊" },
    { path: "/workers", name: "Workers", icon: "👷" },
    { path: "/attendance", name: "Attendance", icon: "⏰" },
    { path: "/payroll", name: "Payroll", icon: "💰" },
    { path: "/safety", name: "Safety", icon: "🦺" },
    { path: "/incidents", name: "Incidents", icon: "🚨" },
    { path: "/training", name: "Training", icon: "🎓" },
    { path: "/shifts", name: "Shifts", icon: "🔄" },
    { path: "/reports", name: "Reports", icon: "📋" },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen transition-all duration-300 shadow-xl`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                ETM Dashboard
              </h2>
              <p className="text-xs text-gray-400">Workflows Engineering</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${isActive
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
                {!isCollapsed && isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      {/* {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-gray-800 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@etm.com</p>
            </div>
          </div>
        </div>
      )} */}
    </aside>
  );
}
