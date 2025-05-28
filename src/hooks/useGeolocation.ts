// src/hooks/useGeolocation.ts
export function useGeolocation() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  
  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000,
    };
    
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition(pos);
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
      options
    );
    
    setIsTracking(true);
    return watchId;
  }, []);
  
  const stopTracking = useCallback((watchId: number) => {
    navigator.geolocation.clearWatch(watchId);
    setIsTracking(false);
  }, []);
  
  return { position, error, isTracking, startTracking, stopTracking };
}
