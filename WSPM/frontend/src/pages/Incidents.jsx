import React, { useState, useEffect } from "react";
import { reportIncident, getIncidents } from "../services/incidentService";
import IncidentForm from "../components/incidents/IncidentForm";
import IncidentList from "../components/incidents/IncidentList";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch {
      alert("❌ Failed to load incidents");
    }
  };

  const handleReportIncident = async (incidentData) => {
    try {
      await reportIncident(incidentData);
      alert("✅ Incident reported successfully");
      loadIncidents();
    } catch {
      alert("❌ Failed to report incident");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">WORKFLOWS ENGINEERING</h1>
          <p className="text-orange-100 mt-1">Equipment & Tool Management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Incident Management</h2>
          <p className="text-gray-600 mb-6">Report and track workplace incidents to maintain safety standards.</p>
        </div>

        {/* Incident Report Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-red-400 to-orange-400 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Report New Incident</h3>
          </div>
          <IncidentForm onReport={handleReportIncident} />
        </div>

        {/* Incidents List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Incident Reports</h3>
            <div className="text-sm text-gray-500">
              Total Incidents: {incidents.length}
            </div>
          </div>
          <IncidentList incidents={incidents} />
        </div>
      </div>
    </div>
  );
}
