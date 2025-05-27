import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuthStore } from "../store/authStore";
import { useWorkoutStore } from "../store/workoutStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    continuousRunTime: "",
    weeklyFrequency: "",
    experienceMonths: "",
    weeklyGoal: "3",
    targetRace: "",
    goals: [] as string[],
  });

  const { setUser } = useAuthStore();
  const { generateWeeklyPlan } = useWorkoutStore();

  const handleFinish = () => {
    setUser({
      name: formData.name,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      continuousRunTime: parseInt(formData.continuousRunTime),
      weeklyFrequency: parseInt(formData.weeklyFrequency),
      experienceMonths: parseInt(formData.experienceMonths),
      weeklyGoal: parseInt(formData.weeklyGoal),
      targetRace: formData.targetRace,
      goals: formData.goals,
    });
    generateWeeklyPlan({
      weeklyGoal: parseInt(formData.weeklyGoal),
      continuousRunTime: parseInt(formData.continuousRunTime),
      weeklyFrequency: parseInt(formData.weeklyFrequency),
      experienceMonths: parseInt(formData.experienceMonths),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Seus Dados de Corredor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Seu nome"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
                placeholder="Idade"
              />
            </div>
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Peso"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="height">Altura (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.height}
              onChange={e => setFormData({ ...formData, height: e.target.value })}
              placeholder="Altura"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="continuousRunTime">Tempo Correndo Sem Parar (min)</Label>
              <Input
                id="continuousRunTime"
                type="number"
                value={formData.continuousRunTime}
                onChange={e => setFormData({ ...formData, continuousRunTime: e.target.value })}
                placeholder="Ex: 10"
              />
            </div>
            <div>
              <Label htmlFor="weeklyFrequency">Corridas/semana</Label>
              <Input
                id="weeklyFrequency"
                type="number"
                value={formData.weeklyFrequency}
                onChange={e => setFormData({ ...formData, weeklyFrequency: e.target.value })}
                placeholder="Ex: 2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="experienceMonths">Meses praticando corrida</Label>
            <Input
              id="experienceMonths"
              type="number"
              value={formData.experienceMonths}
              onChange={e =>
                setFormData({
                  ...formData,
                  experienceMonths: e.target.value,
                })
              }
              placeholder="Ex: 0"
            />
          </div>
          <div>
            <Label htmlFor="weeklyGoal">Objetivo de treinos por semana</Label>
            <Input
              id="weeklyGoal"
              type="number"
              value={formData.weeklyGoal}
              onChange={e =>
                setFormData({
                  ...formData,
                  weeklyGoal: e.target.value,
                })
              }
              placeholder="Ex: 3"
            />
          </div>
          <Button onClick={handleFinish} className="w-full mt-2">
            Começar!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;

