import React from "react";
import { useAuthStore } from "../store/authStore";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo, {user?.name}!</h1>
      <p>Parabéns por iniciar seus treinos de corrida 💪</p>
      <p>Logo você verá seus treinos, evolução e gráficos aqui.</p>
    </div>
  );
};

export default Dashboard;
