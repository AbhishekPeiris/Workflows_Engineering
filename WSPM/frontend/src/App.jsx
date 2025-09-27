import React from "react";
import { Routes, Route } from "react-router-dom";

// Import shared components
import Sidebar from "./components/shared/Sidebar";
import Navbar from "./components/shared/Navbar";

// Import pages
import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";
import Safety from "./pages/Safety";
import Incidents from "./pages/Incidents";
import Training from "./pages/Training";
import Shifts from "./pages/Shifts";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/training" element={<Training />} />
            <Route path="/shifts" element={<Shifts />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
