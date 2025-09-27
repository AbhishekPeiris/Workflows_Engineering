import React, { useState, useEffect } from "react";
import { addTraining, getTrainings } from "../services/trainingService";
import TrainingForm from "../components/training/TrainingForm";
import TrainingList from "../components/training/TrainingList";

export default function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    loadTrainings();
  }, []);

  const loadTrainings = async () => {
    try {
      const data = await getTrainings();
      setTrainings(data);
    } catch {
      alert("❌ Failed to load trainings");
    }
  };

  const handleSaveTraining = async (trainingData) => {
    try {
      await addTraining(trainingData);
      alert("✅ Training recorded successfully");
      loadTrainings();
    } catch {
      alert("❌ Failed to save training");
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Training Records</h2>
          <p className="text-gray-600 mb-6">Track worker training progress, certifications, and safety badges.</p>
        </div>

        {/* Training Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Record New Training</h3>
          <TrainingForm onSave={handleSaveTraining} />
        </div>

        {/* Training List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Training History</h3>
          <TrainingList trainings={trainings} />
        </div>
      </div>
    </div>
  );
}
