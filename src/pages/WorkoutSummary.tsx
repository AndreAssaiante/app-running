// src/pages/WorkoutSummary.tsx
export default function WorkoutSummary() {
  const { lastWorkout } = useWorkoutStore();
  const t = useTranslation();
  
  if (!lastWorkout) {
    return <div>Nenhum treino encontrado</div>;
  }
  
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">{t('workout_completed')}</h1>
        
        {/* Métricas principais */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatsCard
            title={t('distance')}
            value={`${lastWorkout.distance.toFixed(2)} km`}
            icon="📏"
          />
          <StatsCard
            title={t('duration')}
            value={formatTime(lastWorkout.duration * 60)}
            icon="⏱️"
          />
          <StatsCard
            title={t('average_pace')}
            value={formatPace(lastWorkout.pace || 0)}
            icon="⚡"
          />
          <StatsCard
            title={t('calories')}
            value={`${lastWorkout.calories || 0} kcal`}
            icon="🔥"
          />
        </div>
        
        {/* Mapa da rota */}
        {lastWorkout.coordinates && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">{t('route')}</h3>
            <div className="h-48 bg-gray-200 rounded">
              <StaticMap coordinates={lastWorkout.coordinates} />
            </div>
          </div>
        )}
        
        {/* Splits */}
        {lastWorkout.splits && lastWorkout.splits.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">{t('splits')}</h3>
            <SplitsTable splits={lastWorkout.splits} />
          </div>
        )}
        
        {/* Frequência cardíaca */}
        {lastWorkout.heartRate && (
          <div className="mb-6">
            <h3 className="font-bold mb-2">{t('heart_rate')}</h3>
            <div className="flex justify-between">
              <span>{t('average')}: {lastWorkout.heartRate.avg} bpm</span>
              <span>{t('maximum')}: {lastWorkout.heartRate.max} bpm</span>
            </div>
          </div>
        )}
        
        {/* Badges desbloqueadas */}
        <div className="mb-6">
          <NewBadgesAlert />
        </div>
        
        {/* Ações */}
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 bg-blue-500 text-white py-2 rounded"
          >
            {t('back_to_dashboard')}
          </button>
          <button
            onClick={() => shareWorkout(lastWorkout)}
            className="flex-1 bg-green-500 text-white py-2 rounded"
          >
            {t('share_workout')}
          </button>
        </div>
      </div>
    </div>
  );
}
