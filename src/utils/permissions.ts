// src/utils/permissions.ts
export async function requestLocationPermission(): Promise<boolean> {
  if (!navigator.geolocation) {
    throw new Error('Geolocation not supported');
  }
  
  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    
    if (permission.state === 'granted') {
      return true;
    }
    
    if (permission.state === 'prompt') {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => resolve(true),
          () => resolve(false),
          { timeout: 10000 }
        );
      });
    }
    
    return false;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

export async function requestBluetoothPermission(): Promise<boolean> {
  if (!navigator.bluetooth) {
    return false;
  }
  
  try {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['heart_rate']
    });
    
    return !!device;
  } catch (error) {
    console.error('Bluetooth permission denied:', error);
    return false;
  }
}
