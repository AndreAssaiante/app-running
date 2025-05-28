import React from "react";
import { useAuthStore } from "../store/authStore";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

const Profile = () => {
  const { user } = useAuthStore();
  const t = useTranslation();
  if (!user) return null;

  return (
    <div className="p-8">
      <LanguageSelector />
      <h1 className="text-2xl font-bold mb-4">{t("userProfile")}</h1>
      <div className="mb-2">{t("profile")}: {user.name}</div>
      <div className="mb-2">{t("age") || "Idade"}: {user.age}</div>
      <div className="mb-2">{t("weight") || "Peso"}: {user.weight} kg</div>
      <div className="mb-2">{t("height") || "Altura"}: {user.height} cm</div>
      <div className="mb-2">{t("progress") || "Progresso"}: {user.fitnessLevel}</div>
      <div className="mb-2">{t("weeklyGoal")}: {user.weeklyGoal}</div>
      {/* Adicione mais campos que desejar */}
    </div>
  );
};

export default Profile;
