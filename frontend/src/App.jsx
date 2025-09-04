import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserProvider from "./context/UserContext";
import Dasboard from "./pages/Dasboard";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dasboard/>} />

      </Routes>
    </UserProvider>
  );
};

export default App;
