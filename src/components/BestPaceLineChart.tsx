import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useWorkoutStore } from "../store/workoutStore";

// Assume campo avgPace em min/km
export default function BestPaceLineChart() {
  const workouts = useWorkoutStore((s) => s.workouts);
  // Agrupa melhor pace por semana
  const weekData: Record<string, number[]> = {};
  workouts.forEach((w) => {
    if (w.completed && w.avgPace) {
      const date = new Date(w.date);
      const week = `${date.getFullYear()}-W${Math.ceil((date.getDate() + 6 - date.getDay()) / 7)}`;
      if (!weekData[week]) weekData[week] = [];
      weekData[week].push(w.avgPace);
    }
  });
  const data = Object.entries(weekData).map(([week, paces]) => ({
    week,
    bestPace: paces.length ? Math.min(...paces) : 0
  }));

  if (data.length === 0) return <div className="text-gray-500">Complete treinos com pace médio para ver evolução!</div>;

  return (
    <div className="w-full h-64 bg-white border rounded-lg p-4">
      <h2 className="font-bold text-lg mb-2">Melhor pace semanal (min/km)</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="bestPace" stroke="#2563eb" dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
