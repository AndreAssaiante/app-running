import React from "react";
import { useWorkoutStore } from "../store/workoutStore";

const Workouts = () => {
  const { getUpcomingWorkouts } = useWorkoutStore();
  const upcoming = getUpcomingWorkouts();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Próximos Treinos</h1>
      {upcoming.length === 0 && <div>Nenhum treino gerado ainda.</div>}
      <ul>
        {upcoming.map((w) => (
          <li key={w.id} className="mb-2">
            <div><strong>{w.type}</strong> - {w.structure}</div>
            <div>Duração: {w.duration} minutos</div>
            <div>Intensidade: Zona {w.intensity}</div>
            <div>Dia: {new Date(w.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Workouts;
