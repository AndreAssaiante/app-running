import React from "react";
import { useAuthStore } from "../store/authStore";
import { BADGES } from "../badges";
import { useTranslation } from "../hooks/useTranslation";

export default function Badges() {
  const { user } = useAuthStore();
  const unlocked = user?.unlockedBadges || [];
  const t = useTranslation();

  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-2">{t("achievements") || "Conquistas"}</h2>
      <div className="flex flex-wrap gap-4">
        {BADGES.map((badge) => (
          <div
            key={badge.id}
            className={`p-2 rounded border shadow flex flex-col items-center w-32 ${
              unlocked.includes(badge.id)
                ? "bg-yellow-100 border-yellow-500"
                : "bg-gray-200 border-gray-400 opacity-50"
            }`}
          >
            <span className="text-3xl">{badge.icon}</span>
            <span className="font-semibold mt-1">{t(badge.label)}</span>
            <span className="text-xs text-gray-600">{t(badge.description)}</span>
            {unlocked.includes(badge.id) && (
              <span className="text-xs mt-1 text-green-700">{t("unlocked") || "Desbloqueado"}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
