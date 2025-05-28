import React from "react";
import { useAuthStore } from "../store/authStore";
import WeeklyProgressChart from "../components/WeeklyProgressChart";
import WeeklyVolumeChart from "../components/WeeklyVolumeChart";
import WorkoutTypePieChart from "../components/WorkoutTypePieChart";
import BestPaceLineChart from "../components/BestPaceLineChart";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Bem-vindo, {user?.name}!
      </h1>

      <section className="mb-8">
        <p>Parabéns por iniciar seus treinos de corrida! 💪</p>
        <p>Acompanhe abaixo seus resultados e evolução.</p>
      </section>

      <section className="mb-8">
        {/* Gráfico de progresso semanal */}
        <WeeklyProgressChart />
      </section>

      <section className="mb-8">
        {/* Gráfico de volume semanal (tempo e distância) */}
        <WeeklyVolumeChart />
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart: tipos de treino | Line Chart: melhor pace */}
        <WorkoutTypePieChart />
        <BestPaceLineChart />
      </section>

      {/* Você pode adicionar mais estatísticas, cards e relatórios depois! */}
    </div>
  );
};

export default Dashboard;
