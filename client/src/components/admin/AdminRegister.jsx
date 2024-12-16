import React, { useState } from "react";
import { registerAdmin } from "../../api/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords don't match",
        text: "The passwords must match before submission.",
      });
      return;
    }

    try {
      const response = await registerAdmin({
        name,
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Admin Registered!",
        text: response?.message || "Registration successful.",
      }).then(() => {
        // Redirect after the success toast is closed
        navigate("/login/admin");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong during registration.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-4">
          Admin Registration
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your full name"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email address"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-indigo-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-indigo-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
