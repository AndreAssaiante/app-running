// src/components/LiveMap.tsx
import { GoogleMap, Polyline, Marker } from '@react-google-maps/api';

export function LiveMap({ 
  coordinates, 
  currentPosition, 
  isRunning 
}: LiveMapProps) {
  const mapCenter = currentPosition || coordinates[coordinates.length - 1];
  
  const polylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 4,
  };
  
  return (
    <div className="h-64 w-full">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={16}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
        }}
      >
        {coordinates.length > 1 && (
          <Polyline
            path={coordinates}
            options={polylineOptions}
          />
        )}
        
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
