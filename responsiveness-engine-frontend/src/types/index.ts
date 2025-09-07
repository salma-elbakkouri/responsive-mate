// Device Configuration Types
export interface DeviceConfig {
  id: string;
  name: string;
  width: number;
  height: number;
  userAgent?: string;
  devicePixelRatio?: number;
  category: 'mobile' | 'tablet' | 'desktop';
}

// URL and Validation Types
export interface UrlValidationResult {
  isValid: boolean;
  url: string;
  error?: string;
}

// Screenshot Types
export interface ScreenshotConfig {
  url: string;
  devices: DeviceConfig[];
}

export interface Screenshot {
  id: string;
  url: string;
  deviceId: string;
  imageUrl: string;
  timestamp: Date;
  deviceConfig: DeviceConfig;
}

export type ScreenshotStatus = 'pending' | 'generating' | 'completed' | 'failed';

// Project Management Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// UI State Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface UiState {
  status: LoadingState;
  error?: string;
}