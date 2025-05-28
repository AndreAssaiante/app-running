// src/utils/gpsCalculations.ts

export function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = coord1.latitude * Math.PI/180;
  const φ2 = coord2.latitude * Math.PI/180;
  const Δφ = (coord2.latitude-coord1.latitude) * Math.PI/180;
  const Δλ = (coord2.longitude-coord1.longitude) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distância em metros
}

export function calculateCurrentPace(
  recentCoordinates: Coordinate[], 
  timeWindow: number = 30000 // 30 segundos
): number {
  if (recentCoordinates.length < 2) return 0;
  
  const now = Date.now();
  const recentCoords = recentCoordinates.filter(
    coord => now - coord.timestamp.getTime() <= timeWindow
  );
  
  if (recentCoords.length < 2) return 0;
  
  let totalDistance = 0;
  for (let i = 1; i < recentCoords.length; i++) {
    totalDistance += calculateDistance(recentCoords[i-1], recentCoords[i]);
  }
  
  const timeElapsed = (recentCoords[recentCoords.length-1].timestamp.getTime() - 
                      recentCoords[0].timestamp.getTime()) / 1000; // segundos
  
  if (totalDistance === 0) return 0;
  
  const kmDistance = totalDistance / 1000;
  const minutesElapsed = timeElapsed / 60;
  
  return minutesElapsed / kmDistance; // min/km
}

export function detectSplit(
  coordinates: Coordinate[], 
  currentSplits: Split[]
): Split | null {
  const totalDistance = calculateTotalDistance(coordinates);
  const kmCompleted = Math.floor(totalDistance / 1000);
  
  if (kmCompleted > currentSplits.length) {
    // Novo km completado
    const splitStartIndex = findKmStartIndex(coordinates, kmCompleted);
    const splitCoords = coordinates.slice(splitStartIndex);
    const splitTime = (coordinates[coordinates.length-1].timestamp.getTime() - 
                      coordinates[splitStartIndex].timestamp.getTime()) / 1000;
    
    return {
      km: kmCompleted,
      pace: (splitTime / 60), // min/km
      heartRate: null, // TODO: integrar com sensor
      timestamp: new Date()
    };
  }
  
  return null;
}
