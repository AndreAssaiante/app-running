// src/pages/ActiveWorkout.tsx
export default function ActiveWorkout() {
  const {
    isRunning,
    isPaused,
    elapsedTime,
    distance,
    currentPace,
    averagePace,
    splits,
    coordinates,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    stopWorkout,
    addCoordinate,
    addHeartRate,
    updateElapsedTime
  } = useActiveWorkoutStore();
  
  const { position, startTracking, stopTracking } = useGeolocation();
  const { heartRate, connectHeartRateMonitor } = useHeartRate();
  const t = useTranslation();
  
  // Timer para atualizar tempo decorrido
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        updateElapsedTime();
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, updateElapsedTime]);
  
  // Tracking GPS
  useEffect(() => {
    let watchId: number;
    
    if (isRunning) {
      watchId = startTracking();
    } else if (watchId) {
      stopTracking(watchId);
    }
    
    return () => {
      if (watchId) stopTracking(watchId);
    };
  }, [isRunning, startTracking, stopTracking]);
  
  // Adicionar coordenadas quando posição muda
  useEffect(() => {
    if (position && isRunning) {
      const coord: Coordinate = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: new Date(),
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude || undefined
      };
      
      addCoordinate(coord);
    }
  }, [position, isRunning, addCoordinate]);
  
  // Adicionar frequência cardíaca
  useEffect(() => {
    if (heartRate && isRunning) {
      addHeartRate(heartRate);
    }
  }, [heartRate, isRunning, addHeartRate]);
  
  const handleStart = async () => {
    // Solicitar permissões
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    if (permission.state === 'denied') {
      alert(t('location_permission_required'));
      return;
    }
    
    startWorkout();
  };
  
  const handleStop = async () => {
    const confirmed = window.confirm(t('confirm_stop_workout'));
    if (confirmed) {
      await stopWorkout();
      // Navegar para tela de resumo
      navigate('/workout-summary');
    }
  };
  
  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header com métricas */}
      <WorkoutHeader
        elapsedTime={elapsedTime}
        distance={distance}
        currentPace={currentPace}
        heartRate={heartRate}
      />
      
      {/* Mapa */}
      <div className="flex-1">
        <LiveMap
          coordinates={coordinates}
          currentPosition={position ? {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          } : null}
          isRunning={isRunning}
        />
      </div>
      
      {/* Painel de splits */}
      {splits.length > 0 && (
        <SplitsPanel splits={splits} />
      )}
      
      {/* Controles */}
      <WorkoutControls
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={handleStart}
        onPause={pauseWorkout}
        onResume={resumeWorkout}
        onStop={handleStop}
      />
      
      {/* Botão de conectar sensor (se não conectado) */}
      {!heartRate && (
        <div className="p-2 bg-blue-50">
          <button
            onClick={connectHeartRateMonitor}
            className="w-full text-blue-600 text-sm"
          >
            {t('connect_heart_rate_monitor')}
          </button>
        </div>
      )}
    </div>
  );
}
