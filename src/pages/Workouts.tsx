import React, { useState } from "react";
import { useWorkoutStore } from "../store/workoutStore";
import { Button } from "../components/ui/button";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";

type Feedback = {
  perceivedExertion: 1 | 2 | 3 | 4 | 5;
  timeSpent: string;
  notes: string;
};

const Workouts = () => {
  const { getUpcomingWorkouts, completeWorkout } = useWorkoutStore();
  const upcoming = getUpcomingWorkouts();
  const t = useTranslation();
  const [feedbackOpenId, setFeedbackOpenId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback>({
    perceivedExertion: 3,
    timeSpent: "",
    notes: "",
  });

  function handleOpenFeedback(id: string) {
    setFeedbackOpenId(id);
    setFeedback({
      perceivedExertion: 3,
      timeSpent: "",
      notes: "",
    });
  }

  function handleSubmitFeedback(id: string) {
    completeWorkout(id, {
      completed: true,
      feedback: {
        perceivedExertion: feedback.perceivedExertion,
        timeSpent: Number(feedback.timeSpent) || undefined,
        notes: feedback.notes,
      },
    });
    setFeedbackOpenId(null);
  }

  return (
    <div className="p-8">
      <LanguageSelector />
      <h1 className="text-2xl font-bold mb-4">{t("workouts")}</h1>
      {upcoming.length === 0 && <div>{t("noWorkouts") || "Nenhum treino gerado ainda."}</div>}
      <ul>
        {upcoming.map((w) => (
          <li key={w.id} className="mb-4 border rounded p-3 shadow-sm bg-white">
            <div>
              <strong>{t(w.type)}</strong>: {w.structure}
            </div>
            <div>{t("duration") || "Duração"}: {w.duration} min</div>
            <div>{t("intensity") || "Intensidade"}: {w.intensity}</div>
            <div>{t("date") || "Dia"}: {new Date(w.date).toLocaleDateString()}</div>
            {/* Botão de concluir treino */}
            {!w.completed && feedbackOpenId !== w.id && (
              <Button className="mt-2" onClick={() => handleOpenFeedback(w.id)}>
                {t("completed") || "Concluir"}
              </Button>
            )}

            {/* Formulário rápido de feedback pós-treino */}
            {feedbackOpenId === w.id && (
              <div className="mt-3 p-3 border rounded bg-gray-50">
                <div className="mb-2">
                  <label className="block font-medium">{t("effort") || "Esforço percebido"}:</label>
                  <select
                    value={feedback.perceivedExertion}
                    onChange={e =>
                      setFeedback(f => ({
                        ...f,
                        perceivedExertion: Number(e.target.value) as Feedback["perceivedExertion"],
                      }))
                    }
                    className="border rounded px-2 py-1 mt-1"
                  >
                    <option value={1}>1 - Muito leve</option>
                    <option value={2}>2 - Leve</option>
                    <option value={3}>3 - Moderado</option>
                    <option value={4}>4 - Difícil</option>
                    <option value={5}>5 - Exaustivo</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block font-medium">{t("realTime") || "Tempo real (min)"}:</label>
                  <input
                    type="number"
                    value={feedback.timeSpent}
                    onChange={e => setFeedback(f => ({ ...f, timeSpent: e.target.value }))}
                    className="border rounded px-2 py-1 mt-1 w-24"
                    min={0}
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-medium">{t("notes") || "Observações"}:</label>
                  <input
                    type="text"
                    value={feedback.notes}
                    onChange={e => setFeedback(f => ({ ...f, notes: e.target.value }))}
                    className="border rounded px-2 py-1 mt-1 w-full"
                    placeholder={t("anythingToAdd") || "Algo a dizer?"}
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => handleSubmitFeedback(w.id)}>{t("completed") || "Concluir"}</Button>
                  <Button variant="outline" onClick={() => setFeedbackOpenId(null)}>{t("cancel") || "Cancelar"}</Button>
                </div>
              </div>
            )}

            {w.completed && (
              <div className="mt-2 text-green-700 font-semibold">
                {t("completed") || "Concluído"}!
                {w.feedback && (
                  <span className="text-sm ml-2">
                    ({t("effort")}: {w.feedback.perceivedExertion}, {t("realTime")}: {w.feedback.timeSpent || "-"}min)
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
