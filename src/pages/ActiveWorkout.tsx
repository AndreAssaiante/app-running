// src/pages/ActiveWorkout.tsx
interface ActiveWorkoutState {
  isRunning: boolean;
  isPaused: boolean;
  startTime: Date | null;
  elapsedTime: number; // em segundos
  distance: number; // em metros
  currentPace: number; // min/km atual
  averagePace: number; // min/km médio
  heartRate: number | null;
  coordinates: Coordinate[];
  splits: Split[];
  calories: number;
}

interface Coordinate {
  latitude: number;
  longitude: number;
  timestamp: Date;
  accuracy: number;
  altitude?: number;
}
