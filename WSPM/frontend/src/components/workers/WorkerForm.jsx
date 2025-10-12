import React, { useState } from "react";

export default function WorkerForm({ onSave }) {
  const [form, setForm] = useState({
    workerId: "",
    name: "",
    role: "",
    phone: "",
    dob: "",
    contactInfo: "",
    emergencyDetails: "",
    hireDate: "",
    shiftSchedule: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate individual field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "workerId":
        if (!value.trim()) {
          error = "Worker ID is required";
        }
        break;

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
        if (value) {
          const dobDate = new Date(value);
          const minDate = new Date("1960-01-01");
          const maxDate = new Date("2007-12-31");

          if (dobDate < minDate || dobDate > maxDate) {
            error = "Date of birth must be between 1960 and 2007";
          }
        }
        break;

      case "phone":
        if (value.trim()) {
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
              error = "Invalid email format. Only letters, numbers, dots, and underscores allowed";
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
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Process input based on field type
    if (name === 'phone' || name === 'emergencyDetails') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'contactInfo') {
      processedValue = value.replace(/[^a-zA-Z0-9@._]/g, '');
    }

    setForm({ ...form, [name]: processedValue });
    setTouched({ ...touched, [name]: true });

    // Validate field in real-time
    const error = validateField(name, processedValue);
    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    const error = validateField(name, form[name]);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(form).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      alert("⚠️ Please fix the validation errors before submitting");
      return;
    }

    // Check required fields
    if (!form.workerId || !form.name) {
      alert("⚠️ Worker ID & Name are required");
      return;
    }

    onSave(form);

    // Reset form
    setForm({
      workerId: "",
      name: "",
      role: "",
      phone: "",
      dob: "",
      contactInfo: "",
      emergencyDetails: "",
      hireDate: "",
      shiftSchedule: "",
    });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center mb-6">
        <div className="p-2 mr-3 rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Worker ID *
            </label>
            <input
              name="workerId"
              value={form.workerId}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter worker ID"
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.workerId && errors.workerId ? "border-red-500" : "border-gray-300"
                }`}
              required
            />
            {touched.workerId && errors.workerId && (
              <p className="text-xs text-red-500">{errors.workerId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter full name (letters and spaces only)"
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.name && errors.name ? "border-red-500" : "border-gray-300"
                }`}
              required
            />
            {touched.name && errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
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
            {touched.dob && errors.dob && (
              <p className="text-xs text-red-500">{errors.dob}</p>
            )}
            <p className="text-xs text-gray-500">Select date between 1960 and 2007</p>
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
            {touched.role && errors.role && (
              <p className="text-xs text-red-500">{errors.role}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="10-digit phone number"
              maxLength="10"
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.phone && errors.phone ? "border-red-500" : "border-gray-300"
                }`}
            />
            {touched.phone && errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="contactInfo"
              type="email"
              value={form.contactInfo}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="user@example.com"
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.contactInfo && errors.contactInfo ? "border-red-500" : "border-gray-300"
                }`}
            />
            {touched.contactInfo && errors.contactInfo && (
              <p className="text-xs text-red-500">{errors.contactInfo}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Emergency Contact
            </label>
            <input
              name="emergencyDetails"
              value={form.emergencyDetails}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="10-digit emergency contact"
              maxLength="10"
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${touched.emergencyDetails && errors.emergencyDetails ? "border-red-500" : "border-gray-300"
                }`}
            />
            {touched.emergencyDetails && errors.emergencyDetails && (
              <p className="text-xs text-red-500">{errors.emergencyDetails}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Hire Date
            </label>
            <input
              type="date"
              name="hireDate"
              value={form.hireDate}
              onChange={handleChange}
              className="w-full p-3 transition-all border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Shift Schedule
            </label>
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

        <button
          type="submit"
          className="px-6 py-3 font-medium text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 hover:scale-105"
        >
          Save Worker
        </button>
      </form>
    </div>
  );
}