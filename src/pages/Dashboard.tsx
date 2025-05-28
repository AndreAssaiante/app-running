import React from "react";
import { useAuthStore } from "../store/authStore";
import WeeklyProgressChart from "../components/WeeklyProgressChart";
import WeeklyVolumeChart from "../components/WeeklyVolumeChart";
import WorkoutTypePieChart from "../components/WorkoutTypePieChart";
import BestPaceLineChart from "../components/BestPaceLineChart";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

const Dashboard = () => {
  const { user } = useAuthStore();
  const t = useTranslation();

  return (
    <div className="p-8">
      {/* Seletor de idioma no topo */}
      <LanguageSelector />

      <h1 className="text-3xl font-bold mb-6">
        {t("welcome")} {user?.name}!
      </h1>

      <section className="mb-8">
        <p>{t("progress")} - {t("dashboard")} 🚀</p>
        <p>{t("start")} {t("trainings")}?</p>
      </section>

      <section className="mb-8">
        {/* Gráfico de progresso semanal */}
        <WeeklyProgressChart t={t} />
      </section>

      <section className="mb-8">
        {/* Gráfico de volume semanal (tempo e distância) */}
        <WeeklyVolumeChart t={t} />
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart: tipos de treino | Line Chart: melhor pace */}
        <WorkoutTypePieChart t={t} />
        <BestPaceLineChart t={t} />
      </section>
    </div>
  );
};

export default Dashboard;
