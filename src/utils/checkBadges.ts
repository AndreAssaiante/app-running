import { Workout } from "../types";
import { BADGES, BadgeId } from "../badges";

export function calculateUnlockedBadges(
  completedWorkouts: Workout[],
  prevBadges: BadgeId[]
): BadgeId[] {
  const newBadges = [...prevBadges];

  // 1. Primeiro treino
  if (
    completedWorkouts.length >= 1 &&
    !newBadges.includes("first_workout")
  ) {
    newBadges.push("first_workout");
  }

  // 2. Cinco treinos
  if (
    completedWorkouts.length >= 5 &&
    !newBadges.includes("five_workouts")
  ) {
    newBadges.push("five_workouts");
  }

  // 3. Primeira semana completa (pelo menos 1 treino em uma semana)
  const weeks = new Set(
    completedWorkouts.map((w) => {
      const d = new Date(w.date);
      return `${d.getFullYear()}-W${Math.ceil(
        (d.getDate() + 6 - d.getDay()) / 7
      )}`;
    })
  );
  if (weeks.size >= 1 && !newBadges.includes("first_week_complete")) {
    newBadges.push("first_week_complete");
  }

  // 4. 7 TREINOS EM DIAS CONSECUTIVOS
  let streak = 1;
  let maxStreak = 1;
  const sorted = [...completedWorkouts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].date);
    const cur = new Date(sorted[i].date);
    const diff = (cur.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
      if (streak > maxStreak) maxStreak = streak;
    } else {
      streak = 1;
    }
  }
  if (maxStreak >= 7 && !newBadges.includes("seven_in_a_row")) {
    newBadges.push("seven_in_a_row");
  }

  // 5. 50 KM acumulados
  const distance = completedWorkouts.reduce(
    (acc, w) => acc + (w.distance || 0), 0
  );
  if (distance >= 50 && !newBadges.includes("fifty_km")) {
    newBadges.push("fifty_km");
  }

  return newBadges;
}
