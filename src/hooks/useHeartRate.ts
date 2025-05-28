// src/hooks/useHeartRate.ts
export function useHeartRate() {
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  
  const connectHeartRateMonitor = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service']
      });
      
      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService('heart_rate');
      const characteristic = await service?.getCharacteristic('heart_rate_measurement');
      
      await characteristic?.startNotifications();
      characteristic?.addEventListener('characteristicsvaluechanged', handleHeartRateChange);
      
      setDevice(device);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect heart rate monitor:', error);
    }
  };
  
  const handleHeartRateChange = (event: Event) => {
    const target = event.target as BluetoothRemoteGATTCharacteristic;
    const value = target.value;
    
    if (value) {
      const heartRate = value.getUint16(1, true);
      setHeartRate(heartRate);
    }
  };
  
  const disconnect = () => {
    if (device?.gatt?.connected) {
      device.gatt.disconnect();
    }
    setIsConnected(false);
    setHeartRate(null);
    setDevice(null);
  };
  
  return { heartRate, isConnected, connectHeartRateMonitor, disconnect };
}
