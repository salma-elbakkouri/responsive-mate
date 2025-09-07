import { create } from 'zustand';
import { DeviceConfig } from '../types';

interface DeviceStore {
  // State
  selectedDevices: DeviceConfig[];
  availableDevices: DeviceConfig[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setAvailableDevices: (devices: DeviceConfig[]) => void;
  addDevice: (device: DeviceConfig) => void;
  removeDevice: (deviceId: string) => void;
  clearDevices: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  // Initial state
  selectedDevices: [],
  availableDevices: [],
  isLoading: false,
  error: null,

  // Actions
  setAvailableDevices: (devices) => set({ availableDevices: devices }),
  
  addDevice: (device) => set((state) => ({
    selectedDevices: [...state.selectedDevices, device]
  })),
  
  removeDevice: (deviceId) => set((state) => ({
    selectedDevices: state.selectedDevices.filter(d => d.id !== deviceId)
  })),
  
  clearDevices: () => set({ selectedDevices: [] }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error })
}));