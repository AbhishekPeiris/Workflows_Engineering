import React from "react";

// Import actual page components
import Dashboard from "../pages/Dashboard";
import Workers from "../pages/Workers";
import Attendance from "../pages/Attendance";
import Payroll from "../pages/Payroll";
import Safety from "../pages/Safety";
import Incidents from "../pages/Incidents";
import Training from "../pages/Training";
import Shifts from "../pages/Shifts";
import Reports from "../pages/Reports";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/workers", element: <Workers /> },
  { path: "/attendance", element: <Attendance /> },
  { path: "/payroll", element: <Payroll /> },
  { path: "/safety", element: <Safety /> },
  { path: "/incidents", element: <Incidents /> },
  { path: "/training", element: <Training /> },
  { path: "/shifts", element: <Shifts /> },
  { path: "/reports", element: <Reports /> },
];

export default routes;
