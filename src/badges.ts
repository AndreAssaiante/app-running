export type BadgeId =
  | "first_workout"
  | "five_workouts"
  | "seven_in_a_row"
  | "fifty_km"
  | "first_week_complete";

export interface Badge {
  id: BadgeId;
  label: string;        // Agora é uma chave de tradução
  description: string;  // Também uma chave
  icon: string;         // Pode ser emoji
}

export const BADGES: Badge[] = [
  {
    id: "first_workout",
    label: "badge_first_workout_label",
    description: "badge_first_workout_desc",
    icon: "🎉",
  },
  {
    id: "five_workouts",
    label: "badge_five_workouts_label",
    description: "badge_five_workouts_desc",
    icon: "🏅",
  },
  {
    id: "seven_in_a_row",
    label: "badge_seven_in_a_row_label",
    description: "badge_seven_in_a_row_desc",
    icon: "🔥",
  },
  {
    id: "fifty_km",
    label: "badge_fifty_km_label",
    description: "badge_fifty_km_desc",
    icon: "🥇",
  },
  {
    id: "first_week_complete",
    label: "badge_first_week_complete_label",
    description: "badge_first_week_complete_desc",
    icon: "📅",
  }
];
