import React from "react";
import { useWorkoutStore } from "../store/workoutStore";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

const Workouts = () => {
  const { getUpcomingWorkouts } = useWorkoutStore();
  const upcoming = getUpcomingWorkouts();
  const t = useTranslation();

  return (
    <div className="p-8">
      <LanguageSelector />
      <h1 className="text-2xl font-bold mb-4">{t("workouts")}</h1>
      {upcoming.length === 0 && <div>{t("noWorkouts") || "Nenhum treino gerado ainda."}</div>}
      <ul>
        {upcoming.map((w) => (
          <li key={w.id} className="mb-2">
            <div>
              <strong>{t(w.type)}</strong> - {w.structure}
            </div>
            <div>{t("duration") || "Duração"}: {w.duration} min</div>
            <div>{t("intensity") || "Intensidade"}: {w.intensity}</div>
            <div>{t("date") || "Dia"}: {new Date(w.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
