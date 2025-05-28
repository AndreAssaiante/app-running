import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";

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
            <Route path="/profile" element={<div>Perfil do Usuário (em breve)</div>} />
            <Route path="/workouts" element={<div>Lista de Treinos (em breve)</div>} />
          </Routes>
        </>
      )}
    </Router>
  );
}
export default App;
