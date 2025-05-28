export interface User {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  continuousRunTime: number;
  weeklyFrequency: number;
  experienceMonths: number;
  pace5k?: number;
  restingHeartRate?: number;
  maxHeartRate: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  weeklyGoal: number;
  targetRace?: '5k' | '10k' | 'half' | 'marathon';
}

export interface TrainingZone {
  min: number;
  max: number;
  name: string;
  description: string;
}

export interface WorkoutTemplate {
  type: 'recovery' | 'easy' | 'tempo' | 'intervals' | 'long' | 'cross' | 'caco';
  duration: number;
  intensity: 1 | 2 | 3 | 4 | 5;
  structure: string;
  warmup: string;
  cooldown: string;
  notes: string;
}

export interface Workout extends WorkoutTemplate {
  id: string;
  date: Date;
  completed: boolean;
  feedback?: WorkoutFeedback;
  actualDuration?: number;
  distance?: number;
  avgPace?: number;
}

export interface WorkoutFeedback {
  perceivedExertion: 1 | 2 | 3 | 4 | 5;
  heartRateAvg?: number;
  heartRateMax?: number;
  timeSpent?: number;
  fatigueLevel: 1 | 2 | 3 | 4 | 5;
  sleepQuality: 1 | 2 | 3 | 4 | 5;
  muscleSoreness: 1 | 2 | 3 | 4 | 5;
  motivation: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}
