import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const AppContext = createContext();

// Provider wrapper
export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: "Admin User",
    role: "Administrator",
    email: "admin@etm.com",
    avatar: "A"
  });
  const [alerts, setAlerts] = useState([]);
  const [theme, setTheme] = useState("light");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const addAlert = (msg, type = "info") => {
    const alert = {
      msg,
      type,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    setAlerts(prev => [alert, ...prev.slice(0, 4)]); // Keep only last 5 alerts

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeAlert(alert.id);
    }, 5000);
  };

  const removeAlert = (id) => setAlerts(alerts.filter((a) => a.id !== id));

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  // Load user preferences from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("etm-theme");
    const savedSidebar = localStorage.getItem("etm-sidebar");

    if (savedTheme) setTheme(savedTheme);
    if (savedSidebar) setSidebarCollapsed(savedSidebar === "true");
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("etm-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("etm-sidebar", sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  const contextValue = {
    user,
    setUser,
    alerts,
    addAlert,
    removeAlert,
    theme,
    toggleTheme,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
