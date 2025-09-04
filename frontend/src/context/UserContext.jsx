import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

// Create a Context so we can share user data across the app
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // State to hold the logged-in user details
  const [user, setUser] = useState(null);

  // State to show whether we’re still checking if the user is logged in
  const [loading, setLoading] = useState(true);

  // Run once when the app loads -> check if user is already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    // If no token is found, stop loading and return
    if (!accessToken) {
      setLoading(false);
      return;
    }

    // If a token exists, fetch the user's profile from backend
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data); // Save user data in state
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser(); // Clear user if token is invalid/expired
      } finally {
        setLoading(false); // Done checking
      }
    };

    fetchUser();
  }, []);



  // Update user state and save token in localStorage after login/signup
  const updateUser = (userData) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };


  // Clear user state and remove token from localStorage (logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };


  
  // Make user data and functions available to all components in the app
  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
