import React, { useState } from "react";

export default function WorkerForm({ onSave }) {
  const [form, setForm] = useState({
    workerId: "",
    name: "",
    role: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.workerId || !form.name) return alert("Worker ID & Name required");
    onSave(form);
    setForm({ workerId: "", name: "", role: "", phone: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-2 rounded-lg mr-3">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Add New Worker
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Worker ID *
            </label>
            <input
              name="workerId"
              value={form.workerId}
              onChange={handleChange}
              placeholder="Enter worker ID"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Job role/position"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-500 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg"
        >
          Save Worker
        </button>
      </form>
    </div>
  );
}
