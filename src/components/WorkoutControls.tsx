// src/components/WorkoutControls.tsx
export function WorkoutControls({ 
  isRunning, 
  isPaused, 
  onStart, 
  onPause, 
  onResume, 
  onStop 
}: WorkoutControlsProps) {
  const t = useTranslation();
  
  return (
    <div className="p-4 bg-white">
      <div className="flex justify-center space-x-4">
        {!isRunning && !isPaused && (
          <button
            onClick={onStart}
            className="bg-green-500 text-white p-4 rounded-full shadow-lg"
          >
            <PlayIcon className="w-8 h-8" />
          </button>
        )}
        
        {isRunning && (
          <button
            onClick={onPause}
            className="bg-orange-500 text-white p-4 rounded-full shadow-lg"
          >
            <PauseIcon className="w-8 h-8" />
          </button>
        )}
        
        {isPaused && (
          <>
            <button
              onClick={onResume}
              className="bg-green-500 text-white p-4 rounded-full shadow-lg"
            >
              <PlayIcon className="w-8 h-8" />
            </button>
            <button
              onClick={onStop}
              className="bg-red-500 text-white p-4 rounded-full shadow-lg"
            >
              <StopIcon className="w-8 h-8" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
