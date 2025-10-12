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
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadWorkers();
    loadNextWorkerId();
  }, []);

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
    if (!editing && !form.workerId) {
      try {
        const response = await getNextWorkerId();
        setForm((prev) => ({ ...prev, workerId: response.nextWorkerId }));
      } catch (err) {
        console.error("Failed to get next worker ID:", err);
      }
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          error = "Name should contain only letters and spaces (no numbers or special characters)";
        } else if (value.trim().length < 2) {
          error = "Name should be at least 2 characters long";
        }
        break;

      case "dob":
        if (!value) {
          error = "Date of birth is required";
        } else {
          const dobDate = new Date(value);
          const minDate = new Date("1960-01-01");
          const maxDate = new Date("2007-12-31");

          if (dobDate < minDate || dobDate > maxDate) {
            error = "Date of birth must be between 1960 and 2007";
          }
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Phone number is required";
        } else {
          const phoneDigits = value.trim().replace(/\D/g, "");
          if (phoneDigits.length !== 10) {
            error = "Phone number must be exactly 10 digits";
          } else if (!/^\d{10}$/.test(phoneDigits)) {
            error = "Phone number should contain only digits";
          }
        }
        break;

      case "role":
        if (!value.trim()) {
          error = "Role is required";
        }
        break;

      case "contactInfo":
        if (value && value.trim()) {
          const email = value.trim();
          if (!email.includes('@')) {
            error = "Email must contain @ symbol";
          } else {
            const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
              error = "Invalid email format. Only letters, numbers, dots, and underscores allowed (no !#$%- symbols)";
            }
          }
        }
        break;

      case "emergencyDetails":
        if (value && value.trim()) {
          const emergencyDigits = value.trim().replace(/\D/g, "");
          if (emergencyDigits.length > 0 && emergencyDigits.length !== 10) {
            error = "Emergency contact must be exactly 10 digits";
          } else if (emergencyDigits.length > 0 && !/^\d{10}$/.test(emergencyDigits)) {
            error = "Emergency contact should contain only digits";
          }
        }
        break;

      case "hireDate":
        if (!value) {
          error = "Hire date is required";
        }
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'phone' || name === 'emergencyDetails') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'contactInfo') {
      processedValue = value.replace(/[^a-zA-Z0-9@._]/g, '');
    }

    setForm({ ...form, [name]: processedValue });
    setTouched({ ...touched, [name]: true });

    const error = validateField(name, processedValue);
    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    const error = validateField(name, form[name]);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async () => {
    const allTouched = {};
    Object.keys(form).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      alert("⚠️ Please fix the validation errors before submitting");
      return;
    }

    setLoading(true);
    try {
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
    setTouched({});
    setTimeout(() => {
      loadNextWorkerId();
    }, 100);
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
    setTouched({});
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

  const downloadQRCode = async (worker) => {
    try {
      if (!worker.qrCode) {
        alert("❌ QR Code not available for this worker");
        return;
      }

      const link = document.createElement('a');
      link.href = worker.qrCode;
      link.download = `${worker.workerId}_${worker.name.replace(/\s+/g, '_')}_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`✅ QR Code downloaded for ${worker.name} (${worker.workerId})`);
    } catch (error) {
      console.error("Download failed:", error);
      alert("❌ Failed to download QR Code");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="mb-8">
        <div className="p-6 text-white rounded-lg shadow-lg bg-gradient-to-r from-orange-400 to-yellow-400">
          <h1 className="text-3xl font-bold">WORKFLOWS ENGINEERING</h1>
          <p className="mt-1 text-orange-100">Equipment & Tool Management</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="p-6 mb-6 bg-white shadow-lg rounded-xl">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Worker Management</h2>
          <p className="mb-6 text-gray-600">
            Manage your workforce, track employee details, and monitor work schedules with ease.
          </p>
        </div>

        <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 mr-3 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {editing ? "Edit Worker" : "Add New Worker"}
              </h3>
            </div>
            {editing && (
              <button onClick={resetForm} className="px-4 py-2 font-medium text-white transition-all bg-gray-500 rounded-lg hover:bg-gray-600">
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Worker ID *</label>
              <input
                name="workerId"
                placeholder={editing ? "Worker ID (cannot be changed)" : "Auto-generated"}
                value={form.workerId}
                onChange={handleChange}
                disabled={true}
                className="w-full p-3 transition-all bg-gray-100 border rounded-lg cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">
                {editing ? "Worker ID cannot be modified after creation" : "Worker ID will be auto-generated"}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input
                name="name"
                placeholder="Enter full name (letters and spaces only)"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.name && errors.name ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {touched.name && errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                min="1960-01-01"
                max="2007-12-31"
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.dob && errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {touched.dob && errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
              <p className="text-xs text-gray-500">Select date between 1960 and 2007</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                name="contactInfo"
                type="email"
                placeholder="Enter email address (e.g., user@example.com)"
                value={form.contactInfo}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.contactInfo && errors.contactInfo ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {touched.contactInfo && errors.contactInfo && (
                <p className="text-xs text-red-500">{errors.contactInfo}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
              <input
                name="emergencyDetails"
                placeholder="Enter 10-digit emergency contact number"
                value={form.emergencyDetails}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="10"
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.emergencyDetails && errors.emergencyDetails ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {touched.emergencyDetails && errors.emergencyDetails && (
                <p className="text-xs text-red-500">{errors.emergencyDetails}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role *</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.role && errors.role ? "border-red-500" : "border-gray-300"
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
              {touched.role && errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength="10"
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.phone && errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {touched.phone && errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hire Date *</label>
              <input
                type="date"
                name="hireDate"
                value={form.hireDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.hireDate && errors.hireDate ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {touched.hireDate && errors.hireDate && <p className="text-xs text-red-500">{errors.hireDate}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Shift Schedule</label>
              <select
                name="shiftSchedule"
                value={form.shiftSchedule}
                onChange={handleChange}
                className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
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
              className="px-6 py-3 font-medium text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Saving..." : editing ? "Update Worker" : "Add Worker"}
            </button>
          </div>
        </div>

        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Workers Directory</h3>
                <p className="mt-1 text-sm text-gray-600">
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
                    className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-semibold text-left text-gray-700">Worker ID</th>
                  <th className="p-4 font-semibold text-left text-gray-700">Name</th>
                  <th className="p-4 font-semibold text-left text-gray-700">Role</th>
                  <th className="p-4 font-semibold text-left text-gray-700">Phone</th>
                  <th className="p-4 font-semibold text-left text-gray-700">Hire Date</th>
                  <th className="p-4 font-semibold text-left text-gray-700">QR Code</th>
                  <th className="p-4 font-semibold text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 mb-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
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
                        <span className="px-2 py-1 text-sm font-medium text-orange-800 bg-orange-100 rounded-full">
                          {w.role}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">{w.contact?.phone || "N/A"}</td>
                      <td className="p-4 text-gray-600">
                        {w.hireDate ? new Date(w.hireDate).toLocaleDateString() : "-"}
                      </td>
                      <td className="p-4">
                        {w.qrCode ? (
                          <div className="flex items-center space-x-2">
                            <img src={w.qrCode} alt="QR Code" className="w-8 h-8 border rounded" />
                            <button
                              onClick={() => downloadQRCode(w)}
                              className="px-2 py-1 text-xs font-medium text-white transition-all transform rounded bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
                              title="Download QR Code"
                            >
                              📥
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">No QR</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(w._id)}
                            className="px-3 py-1 text-sm font-medium text-white transition-all transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(w)}
                            className="px-3 py-1 text-sm font-medium text-white transition-all transform bg-green-500 rounded-lg hover:bg-green-600 hover:scale-105"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(w._id)}
                            className="px-3 py-1 text-sm font-medium text-white transition-all transform bg-red-500 rounded-lg hover:bg-red-600 hover:scale-105"
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

      {viewingWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl m-4 overflow-y-auto bg-white shadow-2xl rounded-xl max-h-90vh">
            <div className="p-6 text-white bg-gradient-to-r from-orange-400 to-yellow-400 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{viewingWorker.name}</h3>
                  <p className="text-orange-100">Worker ID: {viewingWorker.workerId}</p>
                </div>
                <button
                  onClick={() => setViewingWorker(null)}
                  className="p-2 text-white rounded-lg hover:bg-white hover:bg-opacity-20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {viewingWorker.name}</p>
                      <p><span className="font-medium">Date of Birth:</span> {viewingWorker.dob ? new Date(viewingWorker.dob).toLocaleDateString() : "N/A"}</p>
                      <p><span className="font-medium">Role:</span> {viewingWorker.role}</p>
                      <p><span className="font-medium">Hire Date:</span> {viewingWorker.hireDate ? new Date(viewingWorker.hireDate).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Phone:</span> {viewingWorker.contact?.phone || "N/A"}</p>
                      <p><span className="font-medium">Email:</span> {viewingWorker.contact?.email || "N/A"}</p>
                      <p><span className="font-medium">Emergency Contact:</span> {viewingWorker.contact?.emergencyContact || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">Work Information</h4>
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
                      <h4 className="mb-2 font-semibold text-gray-800">QR Code</h4>
                      <div className="flex items-center space-x-4">
                        <img
                          src={viewingWorker.qrCode}
                          alt="Worker QR Code"
                          className="w-32 h-32 border rounded-lg"
                        />
                        <div className="space-y-2">
                          <button
                            onClick={() => downloadQRCode(viewingWorker)}
                            className="w-full px-4 py-2 font-medium text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
                          >
                            📥 Download QR Code
                          </button>
                          <p className="text-xs text-gray-500">
                            Download as PNG format<br />
                            File: {viewingWorker.workerId}_{viewingWorker.name.replace(/\s+/g, '_')}_QR.png
                          </p>
                        </div>
                      </div>
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