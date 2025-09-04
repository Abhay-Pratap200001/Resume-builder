import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Small card component to show the user's profile info and logout button
export const ProfileInfoCard = () => {
  const navigate = useNavigate();

  // Get current user data and logout function from context
  const { user, clearUser } = useContext(UserContext);

  // Handle logout action
  const handleLogout = () => {
    localStorage.clear(); // Remove saved token and user data from browser storage
    clearUser();          // Clear user from context
    navigate("/");        // Redirect back to home page
  };

  // Only render this card if user exists (logged in)
  return (
    user && (
      <div className="flex items-center gap-3 bg-white shadow-md px-4 py-2 rounded-xl border border-gray-100">
        
        {/* Circle with user's first initial (like an avatar) */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
          {user.name ? user.name.charAt(0).toUpperCase() : ""}
        </div>


        {/* User name and logout button */}
        <div className="flex flex-col">
          {/* Show user's name */}
          <div className="text-sm font-semibold text-gray-800">
            {user.name || ""}
          </div>


          {/* Logout button */}
          <button
            className="text-xs text-red-500 font-medium hover:underline"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
};
