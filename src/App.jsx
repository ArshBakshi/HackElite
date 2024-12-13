import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx"; // Import the HomePage component
import LoginPage from "./pages/LoginPage.jsx"; // Import the LoginPage component

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the HomePage */}
        <Route path="/home" element={<HomePage />} />

        {/* Define the route for the LoginPage */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
