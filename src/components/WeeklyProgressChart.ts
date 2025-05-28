import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useWorkoutStore } from "../store/workoutStore";

export default function WeeklyProgressChart() {
  const workouts = useWorkoutStore((state) => state.workouts);

  // Agrupar treinos por semana do ano (exemplo simples, pode evoluir)
  const weekData: Record<string, number> = {};
  workouts.forEach((w) => {
    const date = new Date(w.date);
    // Semana do ano (simplificada: ano + número da semana)
    const week = `${date.getFullYear()}-W${Math.ceil( (date.getDate() + 6 - date.getDay()) / 7 )}`;
    weekData[week] = (weekData[week] || 0) + (w.completed ? 1 : 0);
  });

  // Transforma para formato de array para o recharts
  const data = Object.entries(weekData).map(([week, total]) => ({
    week,
    total,
  }));

  if (data.length === 0) return <div className="text-gray-500">Nenhum treino concluído ainda!</div>;

  return (
    <div className="w-full h-64 bg-white border rounded-lg p-4">
      <h2 className="font-bold text-lg mb-2">Progresso semanal (treinos completos)</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

