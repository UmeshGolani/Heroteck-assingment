import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const API = "http://localhost:4000/api/user";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error message when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-80% flex justify-center items-center h-screen bg-gray-100">
      <div className="w-80% bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl mb-6 text-blue-400 font-bold">Submit Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <FaUser className="mr-2 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input border rounded mt-1 py-2 w-full ${
                errors.name ? "border-red-500" : "border-blue-400"
              }`}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setErrors({ ...errors, name: "Name is required" });
                }
              }}
              placeholder="Name"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
          <div className="mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input border rounded mt-1 py-2 w-full ${
                errors.email ? "border-red-500" : "border-blue-400"
              }`}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setErrors({ ...errors, email: "Email is required" });
                } else if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                  setErrors({
                    ...errors,
                    email: "Please enter a valid email address",
                  });
                }
              }}
              placeholder="Email"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
          <div className="mb-4 flex items-center">
            <FaPhone className="mr-2 text-gray-400" />
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-input border rounded mt-1 py-2 w-full ${
                errors.phone ? "border-red-500" : "border-blue-400"
              }`}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setErrors({ ...errors, phone: "Phone number is required" });
                } else if (!/^\d{10}$/.test(e.target.value)) {
                  setErrors({
                    ...errors,
                    phone: "Phone number must be 10 digits",
                  });
                }
              }}
              placeholder="Phone"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs italic">{errors.phone}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
