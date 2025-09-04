import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext"; // Context for user authentication state
import { useNavigate } from "react-router-dom"; // To navigate between pages
import { validateEmail } from "../utils/helper"; // Email validation function
import axiosInstance from "../utils/axiosInstance"; // Pre-configured Axios for API calls
import { API_PATHS } from "../utils/apiPath"; // API routes (register, login, etc.)
import Input from "./Input"; // Reusable Input component

const Signup = ({ setCurrentPage }) => {
  // Local state for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error state for showing validation or API errors
  const [error, setError] = useState("");

  // Get updateUser function from context (used to update logged-in user info)
  const { updateUser } = useContext(UserContext);

  // For programmatic navigation (redirect after signup)
  const navigate = useNavigate();

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    // Simple validation checks
    if (!fullName) {
      setError("Please enter full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError(""); // Clear previous errors

    try {
      // Send signup request to backend
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });


      // Extract token from response
      const { token } = response.data;


      // If token exists, save user and redirect to dashboard
      if (token) {
        localStorage.setItem("token", token); // Save token in localStorage
        updateUser(response.data); // Update user context
        navigate("/dashboard"); // Redirect to dashboard
      }
    } 
    catch (error) {
      // Show error message from backend OR fallback message
      setError(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">Create Account</h3>
        <p className="text-gray-500 text-sm">
          Join thousands of professionals today
        </p>
      </div>


      {/* Signup Form */}
      <form onSubmit={handleSignUp} className="space-y-5">
        {/* Full Name */}
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Enter name"
          type="text"/>


        {/* Email */}
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="Enter email"
          type="email"/>



        {/* Password */}
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Enter password"
          type="password"/>
          


        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition">
          Create Account
        </button>


        {/* Footer: Link to Login page */}
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")} // Switch to login form
            type="button"
            className="text-violet-600 font-semibold hover:underline">
            Sign In
          </button>
        </p>
        
      </form>
    </div>
  );
};

export default Signup;
