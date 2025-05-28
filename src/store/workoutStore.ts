import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workout, User } from '../types';
import {
  generateBeginnerPlan,
  generateIntermediatePlan,
  generateAdvancedPlan,
} from '../utils/trainingAlgorithms';
import { useAuthStore } from './authStore'; // para atualizar badges no usuário
import { calculateUnlockedBadges } from '../utils/checkBadges';

// Tipagem (caso precise)
interface WorkoutState {
  workouts: Workout[];
  currentWeek: number;

  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  completeWorkout: (id: string, data: Partial<Workout>) => void;
  generateWeeklyPlan: (user: Partial<User>) => void;
  getCurrentWeekWorkouts: () => Workout[];
  getUpcomingWorkouts: () => Workout[];
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workouts: [],
      currentWeek: 1,

      addWorkout: (workout) => {
        const newWorkout = {
          ...workout,
          id: Date.now().toString(),
        };
        set((state) => ({
          workouts: [...state.workouts, newWorkout],
        }));
      },

      // --- AQUI ESTÁ A INTEGRAÇÃO DAS BADGES ---
      completeWorkout: (id, data) => {
        set((state) => {
          // 1. Atualizar treino como completo
          const workouts = state.workouts.map((workout) =>
            workout.id === id
              ? { ...workout, ...data, completed: true }
              : workout
          );

          // 2. BUSCAR todos treinos completos atualizados
          const completedWorkouts = workouts.filter((w) => w.completed);

          // 3. Atualizar badges do usuário se necessário
          const { user, updateUser } = useAuthStore.getState();
          if (user) {
            const unlocked = calculateUnlockedBadges(
              completedWorkouts,
              user.unlockedBadges || []
            );
            // Atualiza badges APENAS se houve alteração
            if (
              JSON.stringify(unlocked) !== JSON.stringify(user.unlockedBadges)
            ) {
              updateUser({ unlockedBadges: unlocked });
            }
          }

          return { workouts };
        });
      },

      generateWeeklyPlan: (user) => {
        const {
          fitnessLevel = 'beginner',
          weeklyGoal = 3,
          targetRace,
        } = user;
        const currentWeek = get().currentWeek;
        let weeklyPlan;

        switch (fitnessLevel) {
          case 'beginner':
            weeklyPlan = generateBeginnerPlan(currentWeek);
            break;
          case 'intermediate':
            weeklyPlan = generateIntermediatePlan(currentWeek);
            break;
          case 'advanced':
            weeklyPlan = generateAdvancedPlan(currentWeek, targetRace as any);
            break;
          default:
            weeklyPlan = generateBeginnerPlan(currentWeek);
        }

        // Limita ao número de treinos por semana escolhido pelo usuário
        const adjustedPlan = weeklyPlan.slice(0, weeklyGoal);

        const today = new Date();
        const weeklyWorkouts = adjustedPlan.map((workout, index) => {
          const workoutDate = new Date(today);
          workoutDate.setDate(today.getDate() + index);

          return {
            ...workout,
            id: `${Date.now()}-${index}`,
            date: workoutDate,
            completed: false,
          } as Workout;
        });

        set((state) => ({
          workouts: [...state.workouts, ...weeklyWorkouts],
        }));
      },

      getCurrentWeekWorkouts: () => {
        const workouts = get().workouts;
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return workouts.filter((w) => {
          const workoutDate = new Date(w.date);
          return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
        });
      },

      getUpcomingWorkouts: () => {
        const workouts = get().workouts;
        const today = new Date();
        return workouts
          .filter(
            (w) => new Date(w.date) >= today && !w.completed
          )
          .sort(
            (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 5);
      },
    }),
    {
      name: 'workout-storage',
    }
  )
);
