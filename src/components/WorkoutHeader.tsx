// src/components/WorkoutHeader.tsx
export function WorkoutHeader({ 
  elapsedTime, 
  distance, 
  currentPace, 
  heartRate 
}: WorkoutHeaderProps) {
  const t = useTranslation();
  
  return (
    <div className="bg-black text-white p-4 grid grid-cols-2 gap-4">
      <div className="text-center">
        <div className="text-3xl font-mono font-bold">
          {formatTime(elapsedTime)}
        </div>
        <div className="text-sm opacity-80">{t("time")}</div>
      </div>
      
      <div className="text-center">
        <div className="text-3xl font-bold">
          {(distance / 1000).toFixed(2)}
        </div>
        <div className="text-sm opacity-80">{t("distance")} (km)</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold">
          {formatPace(currentPace)}
        </div>
        <div className="text-sm opacity-80">{t("current_pace")}</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold">
          {heartRate ? `${heartRate}` : '--'}
        </div>
        <div className="text-sm opacity-80">{t("heart_rate")} bpm</div>
      </div>
    </div>
  );
}
