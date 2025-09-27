import React from "react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Workers",
      value: 12,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: "👷",
      trend: "+2",
      trendColor: "text-green-500",
    },
    {
      title: "Attendance Rate",
      value: "95%",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      icon: "⏱",
      trend: "+3%",
      trendColor: "text-green-500",
    },
    {
      title: "Pending Payrolls",
      value: 3,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      icon: "💰",
      trend: "-1",
      trendColor: "text-green-500",
    },
    {
      title: "Safety Compliance",
      value: "87%",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: "🦺",
      trend: "+5%",
      trendColor: "text-green-500",
    },
    {
      title: "Safety Incidents",
      value: 1,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      icon: "🚨",
      trend: "-2",
      trendColor: "text-green-500",
    },
    {
      title: "Training Completed",
      value: 15,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      icon: "🎓",
      trend: "+8",
      trendColor: "text-green-500",
    },
  ];

  // const quickActions = [
  //   { title: "Add Worker", icon: "➕", color: "bg-orange-500" },
  //   { title: "Mark Attendance", icon: "✅", color: "bg-green-500" },
  //   { title: "Generate Payroll", icon: "💳", color: "bg-blue-500" },
  //   { title: "Safety Report", icon: "📋", color: "bg-purple-500" },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">WORKFLOWS ENGINEERING</h1>
          <p className="text-orange-100 mt-1">
            Equipment & Tool Management Dashboard
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600">
            Monitor your workforce, track performance metrics, and manage
            operations efficiently.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated:{" "}
            {new Date().toLocaleDateString() +
              " at " +
              new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-14 h-14 flex items-center justify-center text-2xl text-white rounded-xl ${s.color} shadow-lg`}
                  >
                    {s.icon}
                  </div>
                  <div
                    className={`flex items-center text-sm font-medium ${s.trendColor}`}
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {s.trend}
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    {s.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3">
                <p className="text-xs text-gray-600">vs last month</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:from-orange-50 hover:to-yellow-50 transition-all duration-300 transform hover:scale-105 border border-gray-200 hover:border-orange-300"
              >
                <div
                  className={`w-12 h-12 ${action.color} text-white rounded-lg flex items-center justify-center text-xl mb-2 shadow-md`}
                >
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </div> */}

        {/* Recent Activity & Alerts */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
          {/* Recent Activity */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3">
                  👤
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    New worker John Doe added
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center mr-3">
                  ✅
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Attendance marked for today
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center mr-3">
                  🎓
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Safety training completed
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Alerts & Notifications */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Alerts & Notifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <div className="w-10 h-10 bg-yellow-500 text-white rounded-lg flex items-center justify-center mr-3">
                  ⚠️
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    3 payrolls pending approval
                  </p>
                  <p className="text-xs text-gray-500">
                    Requires immediate attention
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center mr-3">
                  🚨
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Safety incident reported
                  </p>
                  <p className="text-xs text-gray-500">
                    Investigation required
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3">
                  📅
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Training due next week
                  </p>
                  <p className="text-xs text-gray-500">
                    5 workers need refresher course
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
