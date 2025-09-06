import { Check, Edit, Eye, EyeOff } from "lucide-react"; // Icons for show/hide password
import React, { useRef, useState } from "react";

// Reusable Input Component
// Props:
// - value: current value of the input
// - onChange: function to update input value
// - label: optional label text above input
// - placeholder: placeholder text inside input
// - type: input type (text, email, password, etc.)
export const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
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


// =================== PROFILE PHOTO SELECTOR ===================
export const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (preview) setPreviewUrl(preview);
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreview?.(url);
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    setPreview?.(null);
  };

  const chooseFile = () => inputRef.current.click();

  return (
    <div className="relative w-32 h-32">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div
          onClick={chooseFile}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`flex items-center justify-center w-full h-full rounded-full border-2 border-dashed border-gray-300 cursor-pointer transition-all duration-300 ${
            hovered ? "bg-gray-100 scale-105" : "bg-gray-50"
          }`}
        >
          <Camera className="text-gray-500" size={28} />
        </div>
      ) : (
        <div
          className="relative w-full h-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            onClick={chooseFile}
            className="w-full h-full rounded-full overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all"
          >
            <img
              src={previewUrl}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {hovered && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 rounded-full">
              <button
                type="button"
                className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition"
                onClick={chooseFile}
              >
                <Edit size={16} />
              </button>

              <button
                type="button"
                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
                onClick={handleRemove}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// =================== TITLE INPUT ===================
export const TitleInput = ({ title, setTitle }) => {
  const [editing, setEditing] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <input
            type="text"
            placeholder="Resume title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
            className={`px-3 py-2 rounded-lg border outline-none transition w-64 text-gray-700 ${
              focused ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-300"
            }`}
          />

          <button
            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
            onClick={() => setEditing(false)}
          >
            <Check className="w-5 h-5" />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setEditing(true)}
          >
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}
    </div>
  );
};