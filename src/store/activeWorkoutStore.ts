// src/store/activeWorkoutStore.ts
interface ActiveWorkoutStore {
  // Estado
  isRunning: boolean;
  isPaused: boolean;
  startTime: Date | null;
  elapsedTime: number;
  distance: number;
  coordinates: Coordinate[];
  splits: Split[];
  heartRateData: HeartRateReading[];
  
  // Métricas calculadas
  currentPace: number;
  averagePace: number;
  calories: number;
  
  // Ações
  startWorkout: () => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  stopWorkout: () => Promise<void>;
  addCoordinate: (coord: Coordinate) => void;
  addHeartRate: (hr: number) => void;
  
  // Controle interno
  updateElapsedTime: () => void;
  calculateMetrics: () => void;
}

export const useActiveWorkoutStore = create<ActiveWorkoutStore>((set, get) => ({
  // Estado inicial
  isRunning: false,
  isPaused: false,
  startTime: null,
  elapsedTime: 0,
  distance: 0,
  coordinates: [],
  splits: [],
  heartRateData: [],
  currentPace: 0,
  averagePace: 0,
  calories: 0,
  
  startWorkout: () => {
    set({
      isRunning: true,
      isPaused: false,
      startTime: new Date(),
      elapsedTime: 0,
      distance: 0,
      coordinates: [],
      splits: [],
      heartRateData: [],
    });
  },
  
  pauseWorkout: () => {
    set({ isRunning: false, isPaused: true });
  },
  
  resumeWorkout: () => {
    set({ isRunning: true, isPaused: false });
  },
  
  stopWorkout: async () => {
    const state = get();
    
    // Salvar treino no workoutStore
    const workout: Workout = {
      id: generateId(),
      type: 'free_run', // ou detectar automaticamente
      distance: state.distance / 1000, // converter para km
      duration: state.elapsedTime / 60, // converter para minutos
      pace: state.averagePace,
      date: state.startTime!,
      completed: true,
      coordinates: state.coordinates,
      splits: state.splits,
      heartRate: {
        avg: calculateAverageHeartRate(state.heartRateData),
        max: Math.max(...state.heartRateData.map(hr => hr.value))
      },
      calories: state.calories
    };
    
    // Adicionar ao store principal
    const workoutStore = useWorkoutStore.getState();
    await workoutStore.addWorkout(workout);
    
    // Reset do estado
    set({
      isRunning: false,
      isPaused: false,
      startTime: null,
      elapsedTime: 0,
      distance: 0,
      coordinates: [],
      splits: [],
      heartRateData: [],
      currentPace: 0,
      averagePace: 0,
      calories: 0,
    });
  },
  
  addCoordinate: (coord) => {
    const state = get();
    const newCoords = [...state.coordinates, coord];
    
    // Calcular nova distância
    const newDistance = calculateTotalDistance(newCoords);
    
    // Verificar se completou um novo split
    const newSplit = detectSplit(newCoords, state.splits);
    const splits = newSplit ? [...state.splits, newSplit] : state.splits;
    
    set({
      coordinates: newCoords,
      distance: newDistance,
      splits,
    });
    
    // Recalcular métricas
    get().calculateMetrics();
  },
  
  addHeartRate: (hr) => {
    const state = get();
    const newHrData = [...state.heartRateData, {
      value: hr,
      timestamp: new Date()
    }];
    
    set({ heartRateData: newHrData });
  },
  
  updateElapsedTime: () => {
    const state = get();
    if (state.isRunning && state.startTime) {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - state.startTime.getTime()) / 1000);
      set({ elapsedTime: elapsed });
    }
  },
  
  calculateMetrics: () => {
    const state = get();
    
    if (state.coordinates.length < 2) return;
    
    // Pace atual (últimos 30 segundos)
    const currentPace = calculateCurrentPace(state.coordinates);
    
    // Pace médio
    const totalTimeMinutes = state.elapsedTime / 60;
    const totalDistanceKm = state.distance / 1000;
    const averagePace = totalDistanceKm > 0 ? totalTimeMinutes / totalDistanceKm : 0;
    
    // Calorias (fórmula aproximada)
    const calories = calculateCalories(totalDistanceKm, totalTimeMinutes, 70); // 70kg padrão
    
    set({
      currentPace,
      averagePace,
      calories
    });
  }
}));
