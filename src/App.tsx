import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Profile from "./pages/Profile";
import Workouts from "./pages/Workouts";

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      {!user ? (
        <Onboarding />
      ) : (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </>
      )}
    </Router>
  );
}
export default App;
