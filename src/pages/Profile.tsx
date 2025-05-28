import React from "react";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const { user } = useAuthStore();
  if (!user) return null;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
      <div className="mb-2">Nome: {user.name}</div>
      <div className="mb-2">Idade: {user.age}</div>
      <div className="mb-2">Peso: {user.weight} kg</div>
      <div className="mb-2">Altura: {user.height} cm</div>
      <div className="mb-2">Nível: {user.fitnessLevel}</div>
      <div className="mb-2">Meta de treinos/semana: {user.weeklyGoal}</div>
      {/* Adicione mais informações quando desejar */}
    </div>
  );
};
export default Profile;
