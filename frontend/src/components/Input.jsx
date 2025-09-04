import { Eye, EyeOff } from "lucide-react"; // Icons for show/hide password
import React, { useState } from "react";

// Reusable Input Component
// Props:
// - value: current value of the input
// - onChange: function to update input value
// - label: optional label text above input
// - placeholder: placeholder text inside input
// - type: input type (text, email, password, etc.)
const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
  // State to toggle password visibility (only used when type="password")
  const [showPassword, setShowPassword] = useState(false);

  // State to check if input is focused (used for styling)
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      {/* Show label if provided */}
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input container with dynamic border when focused */}
      <div
        className={`flex items-center border rounded-lg px-3 py-2 transition 
        ${isFocused ? "border-violet-500 shadow-sm" : "border-gray-300"}`}>


        {/* Input field */}
        <input
          type={
            // If it's a password field, toggle between text/password based on state
            type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm"
          value={value}
          onChange={onChange} // Calls parent function to update value
          onFocus={() => setIsFocused(true)} // Set focus state
          onBlur={() => setIsFocused(false)} // Remove focus state
/>

        {/* Show password toggle button only for password inputs */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle state
            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            {/* Show "Eye" when hidden, "EyeOff" when visible */}
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
