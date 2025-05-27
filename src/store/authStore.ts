import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { classifyRunnerLevel } from '../utils/trainingAlgorithms';

interface AuthState {
  user: User | null;
  setUser: (user: Partial<User>) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData) => {
        const maxHeartRate = 220 - (userData.age || 25);
        const fitnessLevel = classifyRunnerLevel(userData);

        const user: User = {
          id: Date.now().toString(),
          name: userData.name || '',
          age: userData.age || 25,
          weight: userData.weight || 70,
          height: userData.height || 170,
          continuousRunTime: userData.continuousRunTime || 0,
          weeklyFrequency: userData.weeklyFrequency || 2,
          experienceMonths: userData.experienceMonths || 0,
          pace5k: userData.pace5k,
          restingHeartRate: userData.restingHeartRate,
          maxHeartRate,
          fitnessLevel,
          goals: userData.goals || [],
          weeklyGoal: userData.weeklyGoal || 3,
          targetRace: userData.targetRace
        };

        set({ user });
      },
      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          if (updates.age) {
            updatedUser.maxHeartRate = 220 - updates.age;
          }
          set({ user: updatedUser });
        }
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
