import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useWorkoutStore } from "../store/workoutStore";

const COLORS = ["#60a5fa", "#16a34a", "#fbbf24", "#dc2626", "#a21caf", "#6366f1", "#f472b6"];

export default function WorkoutTypePieChart() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const counts: Record<string, number> = {};
  workouts.forEach(w => {
    if (w.completed) counts[w.type] = (counts[w.type] || 0) + 1;
  });
  const data = Object.entries(counts).map(([type, value]) => ({ type, value }));

  if (data.length === 0) return <div className="text-gray-500">Nenhum treino feito ainda.</div>;

  return (
    <div className="w-full h-64 bg-white border rounded-lg p-4">
      <h2 className="font-bold text-lg mb-2">Tipos de treino realizados</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} nameKey="type" dataKey="value" cx="50%" cy="50%" outerRadius={70}>
            {data.map((entry, idx) => <Cell key={entry.type} fill={COLORS[idx % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
