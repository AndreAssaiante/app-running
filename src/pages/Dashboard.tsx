import React from "react";
import { useAuthStore } from "../store/authStore";
import WeeklyProgressChart from "../components/WeeklyProgressChart";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo, {user?.name}!</h1>
      <p>Parabéns por iniciar seus treinos de corrida 💪</p>
      <div className="my-10">
        <WeeklyProgressChart />
      </div>
      {/* Adicione outros cards, métricas, estatísticas aqui */}
    </div>
  );
};

export default Dashboard;
