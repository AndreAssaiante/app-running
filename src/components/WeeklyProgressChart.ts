import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useWorkoutStore } from "../store/workoutStore";

export default function WeeklyVolumeChart() {
  const workouts = useWorkoutStore((state) => state.workouts);

  const weekData: Record<string, { duration: number, distance: number }> = {};
  workouts.forEach((w) => {
    const date = new Date(w.date);
    const week = `${date.getFullYear()}-W${Math.ceil( (date.getDate() + 6 - date.getDay()) / 7 )}`;
    if (!weekData[week]) weekData[week] = { duration: 0, distance: 0 };
    if (w.completed) {
      weekData[week].duration += w.duration || 0;
      weekData[week].distance += w.distance || 0;
    }
  });
  const data = Object.entries(weekData).map(([week, { duration, distance }]) => ({
    week, duration, distance
  }));

  if (data.length === 0) return <div className="text-gray-500">Nenhum treino concluído ainda!</div>;

  return (
    <div className="w-full h-64 bg-white border rounded-lg p-4">
      <h2 className="font-bold text-lg mb-2">Volume semanal (tempo e distância)</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis yAxisId="left" label={{ value: 'Minutos', angle: -90, dx: -20 }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: 'Km', angle: 90, dx: 20 }} />
          <Tooltip />
          <Bar yAxisId="left" dataKey="duration" fill="#818cf8" name="Minutos" />
          <Bar yAxisId="right" dataKey="distance" fill="#84cc16" name="Km" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
