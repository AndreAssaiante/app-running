import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      {!user ? (
        <Onboarding />
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
