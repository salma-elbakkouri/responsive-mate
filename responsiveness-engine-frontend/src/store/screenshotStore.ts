import { create } from 'zustand';
import { Screenshot, ScreenshotStatus } from '../types';

interface ScreenshotStore {
  // State
  screenshots: Screenshot[];
  status: ScreenshotStatus;
  currentUrl: string;
  error: string | null;

  // Actions
  setCurrentUrl: (url: string) => void;
  setStatus: (status: ScreenshotStatus) => void;
  addScreenshot: (screenshot: Screenshot) => void;
  addScreenshots: (screenshots: Screenshot[]) => void;
  removeScreenshot: (screenshotId: string) => void;
  clearScreenshots: () => void;
  setError: (error: string | null) => void;
}

export const useScreenshotStore = create<ScreenshotStore>((set) => ({
  // Initial state
  screenshots: [],
  status: 'pending',
  currentUrl: '',
  error: null,

  // Actions
  setCurrentUrl: (url) => set({ currentUrl: url }),
  
  setStatus: (status) => set({ status }),
  
  addScreenshot: (screenshot) => set((state) => ({
    screenshots: [...state.screenshots, screenshot]
  })),
  
  addScreenshots: (screenshots) => set((state) => ({
    screenshots: [...state.screenshots, ...screenshots]
  })),
  
  removeScreenshot: (screenshotId) => set((state) => ({
    screenshots: state.screenshots.filter(s => s.id !== screenshotId)
  })),
  
  clearScreenshots: () => set({ screenshots: [] }),
  
  setError: (error) => set({ error })
}));