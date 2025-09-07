import { UrlValidationResult, ScreenshotConfig, Screenshot, DeviceConfig, ApiResponse } from '../types';

const API_BASE = process.env.GATSBY_API_URL || 'http://localhost:8080';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async validateUrl(url: string): Promise<ApiResponse<UrlValidationResult>> {
    return this.request<UrlValidationResult>('/api/validate-url', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
  }

  async getDevices(): Promise<ApiResponse<DeviceConfig[]>> {
    return this.request<DeviceConfig[]>('/api/devices');
  }

  async generateScreenshots(config: ScreenshotConfig): Promise<ApiResponse<Screenshot[]>> {
    return this.request<Screenshot[]>('/api/screenshots', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async getScreenshots(projectId?: string): Promise<ApiResponse<Screenshot[]>> {
    const endpoint = projectId ? `/api/screenshots?projectId=${projectId}` : '/api/screenshots';
    return this.request<Screenshot[]>(endpoint);
  }
}

export const apiService = new ApiService();