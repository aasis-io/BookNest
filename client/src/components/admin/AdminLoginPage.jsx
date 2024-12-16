import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { loginAdmin } from "../../api/auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate here properly
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if admin is already logged in by verifying token presence
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const admin = JSON.parse(storedAdmin);
      if (admin?.token) {
        navigate("/admin/dashboard/manage"); // Navigate after initialization
      }
    }
  }, [navigate]); // Add `navigate` as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the login API
      const response = await loginAdmin({ email, password });

      // Debugging response to ensure data is correct
      console.log("API Response: ", response);

      if (response?.data?.token && response?.data?.admin) {
        // Explicitly combine token and admin details
        const adminWithToken = {
          ...response.data.admin,
          token: response.data.token,
        };

        console.log("Data combined for storage: ", adminWithToken);

        // Securely store combined token and admin details
        localStorage.setItem("admin", JSON.stringify(adminWithToken));
        sessionStorage.setItem("admin", JSON.stringify(adminWithToken));

        // Show success toast
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome, ${response.data?.admin?.name}`,
          position: "top-end",
          showConfirmButton: false,
          timer: 2500,
          toast: true,
        });

        // Redirect to admin dashboard after delay
        setTimeout(() => {
          navigate("/admin/dashboard/manage"); // Use navigate instead of window.location
        }, 2000);
      } else {
        throw new Error("Missing token or admin data");
      }
    } catch (error) {
      console.error("Admin Login Error: ", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password.",
        position: "top-end",
        showConfirmButton: false,
        timer: 2500,
        toast: true,
      });
    }
  };

  return (
    <div className="py-12 flex items-center justify-center px-4 sm:px-8">
      {/* Centered card container */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 sm:p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700 font-acme">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Securely sign in to your admin panel
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with show/hide functionality */}
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="border rounded-lg w-full p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Eye button */}
            <button
              type="button"
              className="absolute right-3 top-11 text-gray-600 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>
            &copy; {new Date().getFullYear()} BookNest. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
