import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./context/UserContext";
import Dasboard from "./pages/Dasboard";
import EditResume from "./components/EditResume";
import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

const App = () => {
  return (
    <UserProvider>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="/resume/:resumeId" element={<EditResume />} />
        </Routes>
        <Toaster position="top-right" reverseOrder={false} /> 
      </>
    </UserProvider>
  );
};

export default App;
