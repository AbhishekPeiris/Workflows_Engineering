import React, { useEffect, useState } from "react";
import {
  getWorkers,
  createWorker,
  updateWorker,
  deleteWorker,
  getNextWorkerId,
  getWorker,
} from "../services/workerService";

export default function Workers() {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    workerId: "",
    name: "",
    dob: "",
    contactInfo: "",
    emergencyDetails: "",
    role: "",
    phone: "",
    hireDate: "",
    shiftSchedule: "",
  });
  const [editing, setEditing] = useState(null);
  const [viewingWorker, setViewingWorker] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Load workers when component mounts
  useEffect(() => {
    loadWorkers();
    loadNextWorkerId();
  }, []);

  // Filter workers based on search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredWorkers(workers);
    } else {
      const filtered = workers.filter(
        (worker) =>
          worker.workerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.contact?.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.contact?.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredWorkers(filtered);
    }
  }, [workers, searchQuery]);

  const loadWorkers = async () => {
    try {
      const data = await getWorkers();
      setWorkers(data);
    } catch (err) {
      console.error("Failed to load workers:", err);
      alert("❌ Failed to load workers");
    }
  };

  const loadNextWorkerId = async () => {
    if (!editing) {
      try {
        const response = await getNextWorkerId();
        setForm((prev) => ({ ...prev, workerId: response.nextWorkerId }));
      } catch (err) {
        console.error("Failed to get next worker ID:", err);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
      newErrors.name = "Name should contain only letters and spaces";
    }

    // DOB validation
    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(form.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 18 || age > 65) {
        newErrors.dob = "Age should be between 18 and 65 years";
      }
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.trim().replace(/\D/g, ""))) {
      newErrors.phone = "Phone number should be 10 digits";
    }

    // Role validation
    if (!form.role.trim()) {
      newErrors.role = "Role is required";
    }

    // Email validation (if provided)
    if (form.contactInfo && form.contactInfo.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.contactInfo.trim())) {
        newErrors.contactInfo = "Please enter a valid email address";
      }
    }

    // Hire date validation
    if (!form.hireDate) {
      newErrors.hireDate = "Hire date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("⚠️ Please fix the validation errors before submitting");
      return;
    }

    setLoading(true);
    try {
      // Prepare the data in the correct format
      const workerData = {
        workerId: form.workerId.trim(),
        name: form.name.trim(),
        dob: form.dob,
        contactInfo: form.contactInfo.trim(),
        emergencyDetails: form.emergencyDetails.trim(),
        role: form.role.trim(),
        phone: form.phone.trim(),
        hireDate: form.hireDate,
        shiftSchedule: form.shiftSchedule.trim(),
      };

      if (editing) {
        await updateWorker(editing._id, workerData);
        alert("✅ Worker updated successfully");
      } else {
        await createWorker(workerData);
        alert("✅ Worker created successfully");
      }

      // Reset form
      resetForm();
      loadWorkers();
    } catch (err) {
      console.error("Worker save failed:", err);
      alert(`❌ Failed to save worker: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      workerId: "",
      name: "",
      dob: "",
      contactInfo: "",
      emergencyDetails: "",
      role: "",
      phone: "",
      hireDate: "",
      shiftSchedule: "",
    });
    setEditing(null);
    setErrors({});
    loadNextWorkerId();
  };

  const handleEdit = (w) => {
    setForm({
      workerId: w.workerId || "",
      name: w.name || "",
      dob: w.dob ? w.dob.substring(0, 10) : "",
      contactInfo: w.contact?.email || "",
      emergencyDetails: w.contact?.emergencyContact || "",
      role: w.role || "",
      phone: w.contact?.phone || "",
      hireDate: w.hireDate ? w.hireDate.substring(0, 10) : "",
      shiftSchedule: w.shiftSchedule || "",
    });
    setEditing(w);
    setErrors({});
  };

  const handleView = async (workerId) => {
    try {
      const worker = await getWorker(workerId);
      setViewingWorker(worker);
    } catch (err) {
      console.error("Failed to load worker details:", err);
      alert("❌ Failed to load worker details");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;
    try {
      await deleteWorker(id);
      alert("✅ Worker deleted successfully");
      loadWorkers();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("❌ Failed to delete worker");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Worker Management
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your workforce, track employee details, and monitor work
            schedules with ease.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
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
                {editing ? "Edit Worker" : "Add New Worker"}
              </h3>
            </div>
            {editing && (
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-all"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Worker ID *
              </label>
              <input
                name="workerId"
                placeholder="Auto-generated"
                value={form.workerId}
                onChange={handleChange}
                disabled={!editing}
                className={`w-full border rounded-lg p-3 transition-all ${!editing
                    ? "bg-gray-100"
                    : "border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  } ${errors.workerId ? "border-red-500" : ""}`}
              />
              {errors.workerId && (
                <p className="text-red-500 text-xs">{errors.workerId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                name="name"
                placeholder="Enter full name"
                value={form.name}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${errors.name ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="contactInfo"
                type="email"
                placeholder="Enter email address"
                value={form.contactInfo}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${errors.contactInfo ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.contactInfo && (
                <p className="text-red-500 text-xs">{errors.contactInfo}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Emergency Contact
              </label>
              <input
                name="emergencyDetails"
                placeholder="Emergency contact details"
                value={form.emergencyDetails}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role *</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${errors.role ? "border-red-500" : "border-gray-300"
                  }`}
              >
                <option value="">Select Role</option>
                <option value="Welder">Welder</option>
                <option value="Electrician">Electrician</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Manager">Manager</option>
                <option value="Engineer">Engineer</option>
                <option value="Technician">Technician</option>
                <option value="Operator">Operator</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Hire Date *
              </label>
              <input
                type="date"
                name="hireDate"
                value={form.hireDate}
                onChange={handleChange}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${errors.hireDate ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.hireDate && <p className="text-red-500 text-xs">{errors.hireDate}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Shift Schedule
              </label>
              <select
                name="shiftSchedule"
                value={form.shiftSchedule}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              >
                <option value="">Select Shift</option>
                <option value="Morning (6 AM - 2 PM)">Morning (6 AM - 2 PM)</option>
                <option value="Afternoon (2 PM - 10 PM)">Afternoon (2 PM - 10 PM)</option>
                <option value="Night (10 PM - 6 AM)">Night (10 PM - 6 AM)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-500 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : editing ? "Update Worker" : "Add Worker"}
            </button>
          </div>
        </div>

        {/* Search and Workers Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Workers Directory
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Total Workers: {workers.length} | Showing: {filteredWorkers.length}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search workers..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Worker ID
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Hire Date
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-300 mb-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>
                          {searchQuery
                            ? "No workers found matching your search."
                            : "No workers found. Add your first worker to get started."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredWorkers.map((w, index) => (
                    <tr
                      key={w._id}
                      className={`border-t hover:bg-orange-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                    >
                      <td className="p-4 font-medium text-gray-900">{w.workerId}</td>
                      <td className="p-4 text-gray-800">{w.name}</td>
                      <td className="p-4">
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                          {w.role}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">{w.contact?.phone || "N/A"}</td>
                      <td className="p-4 text-gray-600">
                        {w.hireDate ? new Date(w.hireDate).toLocaleDateString() : "-"}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(w._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(w)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(w._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Worker Details Modal */}
      {viewingWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full m-4 max-h-90vh overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">{viewingWorker.name}</h3>
                  <p className="text-orange-100">Worker ID: {viewingWorker.workerId}</p>
                </div>
                <button
                  onClick={() => setViewingWorker(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {viewingWorker.name}</p>
                      <p><span className="font-medium">Date of Birth:</span> {viewingWorker.dob ? new Date(viewingWorker.dob).toLocaleDateString() : "N/A"}</p>
                      <p><span className="font-medium">Role:</span> {viewingWorker.role}</p>
                      <p><span className="font-medium">Hire Date:</span> {viewingWorker.hireDate ? new Date(viewingWorker.hireDate).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Phone:</span> {viewingWorker.contact?.phone || "N/A"}</p>
                      <p><span className="font-medium">Email:</span> {viewingWorker.contact?.email || "N/A"}</p>
                      <p><span className="font-medium">Emergency Contact:</span> {viewingWorker.contact?.emergencyContact || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Work Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Shift Schedule:</span> {viewingWorker.shiftSchedule || "N/A"}</p>
                      <p><span className="font-medium">Compliance Score:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${viewingWorker.complianceScore >= 90 ? 'bg-green-100 text-green-800' :
                            viewingWorker.complianceScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                          }`}>
                          {viewingWorker.complianceScore}%
                        </span>
                      </p>
                    </div>
                  </div>

                  {viewingWorker.qrCode && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">QR Code</h4>
                      <img
                        src={viewingWorker.qrCode}
                        alt="Worker QR Code"
                        className="w-32 h-32 border rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
