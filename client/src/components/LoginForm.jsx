import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const user = localStorage.getItem("user");

    if (user) {
      // Redirect to homepage if logged in
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`,
        {
          email,
          password,
        }
      );

      if (response.data) {
        // Destructure the token and user details from response
        const { token, user } = response.data;

        // Combine token and user details
        const userData = { token, ...user };

        // Store in localStorage and sessionStorage
        localStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("user", JSON.stringify(userData));

        setSuccess("Login successful!");

        // Redirect to homepage
        setTimeout(() => navigate("/"), 1500);
        window.location.reload();
      } else {
        setError("Failed to retrieve user data.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center p-16">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
