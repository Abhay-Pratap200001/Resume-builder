import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // To update user state globally
import axiosInstance from "../utils/axiosInstance"; // Pre-configured axios instance
import { API_PATHS } from "../utils/apiPath"; // Centralized API routes
import { validateEmail } from "../utils/helper"; // Simple email validation
import { Input } from "./Input";
// Login Component
// Props:
// - setCurrentPage: function to switch between login and signup
const Login = ({ setCurrentPage }) => {
  // Local state for form inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Access global user context
  const { updateUser } = useContext(UserContext);

  // For navigation after successful login
  const navigate = useNavigate();

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation before API call
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }
    setError("");

    try {
      // API call to backend login route
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      // Extract token from response
      const { token } = response.data;

      // If token exists, save it and update global user state
      if (token) {
        localStorage.setItem("token", token); // Save token to localStorage
        updateUser(response.data); // Update global user context
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      // Show error message from backend or fallback
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
        <p className="text-gray-500 text-sm">
          Sign in to continue building amazing resumes
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Enter email"
            type="email"/>
        </div>


        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Enter password"
            type="password"/>
        </div>


        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>)}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition">
          Sign In
        </button>


        {/* Switch to Signup */}
        <p className="text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className="text-violet-600 font-semibold hover:underline">
            Sign Up
          </button>
        </p>
        
      </form>
    </div>
  );
};

export default Login;
