# Frontend Development Guide

## Project Overview
A **Gatsby + TypeScript + MUI** web application for responsive design testing, focusing on simplicity and team collaboration.

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Basic components (Button, Input, etc.)
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── features/       # Feature-specific components
├── pages/              # Gatsby pages (auto-routing)
├── templates/          # Page templates for dynamic content
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── services/           # API calls and external services
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles and theme
```

## 📝 Naming Conventions

### Files & Folders
- **Folders**: `kebab-case` → `device-selection`, `screenshot-gallery`
- **Components**: `PascalCase` → `DeviceSelector.tsx`, `ScreenshotCard.tsx`
- **Pages**: `kebab-case` → `device-testing.tsx`, `project-history.tsx`
- **Hooks**: `camelCase` → `useDeviceConfig.ts`, `useScreenshot.ts`
- **Services**: `camelCase` → `apiService.ts`, `screenshotService.ts`

### Variables & Functions
```typescript
// Variables: camelCase
const deviceList = ['iPhone', 'iPad'];
const isLoading = false;

// Functions: camelCase 
const handleUrlSubmit = () => {};
const generateScreenshot = async () => {};

// Constants: SCREAMING_SNAKE_CASE
const MAX_DEVICES = 12;
const API_ENDPOINTS = {
  SCREENSHOT: '/api/screenshot',
  DEVICES: '/api/devices'
};

// Types/Interfaces: PascalCase
interface DeviceConfig {
  name: string;
  width: number;
  height: number;
}

type ScreenshotStatus = 'pending' | 'completed' | 'failed';
```

## 🎨 Component Structure

### Basic Component Template
```typescript
// src/components/features/DeviceSelector.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface DeviceSelectorProps {
  devices: DeviceConfig[];
  onSelect: (device: DeviceConfig) => void;
  selectedDevices?: DeviceConfig[];
}

export const DeviceSelector: React.FC<DeviceSelectorProps> = ({
  devices,
  onSelect,
  selectedDevices = []
}) => {
  return (
    <Box>
      <Typography variant="h6">Select Devices</Typography>
      {/* Component content */}
    </Box>
  );
};
```

### Folder Structure per Component
```
components/features/device-selector/
├── DeviceSelector.tsx          # Main component
├── DeviceSelectorCard.tsx      # Sub-component
├── index.ts                    # Export barrel
└── types.ts                    # Component-specific types
```

## 🏪 State Management (Zustand)

### Store Structure
```typescript
// src/store/deviceStore.ts
import { create } from 'zustand';

interface DeviceStore {
  selectedDevices: DeviceConfig[];
  isLoading: boolean;
  
  // Actions
  addDevice: (device: DeviceConfig) => void;
  removeDevice: (deviceId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  selectedDevices: [],
  isLoading: false,
  
  addDevice: (device) => set((state) => ({
    selectedDevices: [...state.selectedDevices, device]
  })),
  
  removeDevice: (deviceId) => set((state) => ({
    selectedDevices: state.selectedDevices.filter(d => d.id !== deviceId)
  })),
  
  setLoading: (isLoading) => set({ isLoading })
}));
```

## 🌐 API Services

### Service Structure
```typescript
// src/services/apiService.ts
const API_BASE = process.env.GATSBY_API_URL || 'http://localhost:8080';

export const apiService = {
  async validateUrl(url: string): Promise<ValidationResult> {
    const response = await fetch(`${API_BASE}/api/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error('URL validation failed');
    }
    
    return response.json();
  },
  
  async generateScreenshot(config: ScreenshotConfig): Promise<ScreenshotResult> {
    // Screenshot generation logic
  }
};
```

## 🎣 Custom Hooks

### Hook Patterns
```typescript
// src/hooks/useScreenshot.ts
import { useState } from 'react';
import { screenshotService } from '../services/screenshotService';

export const useScreenshot = () => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateScreenshot = async (config: ScreenshotConfig) => {
    setIsGenerating(true);
    try {
      const result = await screenshotService.generate(config);
      setScreenshots(prev => [...prev, result]);
      return result;
    } catch (error) {
      console.error('Screenshot generation failed:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    screenshots,
    isGenerating,
    generateScreenshot
  };
};
```

## ✅ Code Standards

### TypeScript Rules
```typescript
// ✅ DO: Use strict typing
interface UrlValidationProps {
  url: string;
  onValidate: (isValid: boolean) => void;
}

// ❌ DON'T: Use any
const handleSubmit = (data: any) => {};

// ✅ DO: Use proper null checking
const device = devices?.find(d => d.id === selectedId);

// ❌ DON'T: Use non-null assertion unnecessarily
const device = devices.find(d => d.id === selectedId)!;

// ✅ DO: Use enums or const assertions for constants
const DEVICE_TYPES = ['mobile', 'tablet', 'desktop'] as const;
type DeviceType = typeof DEVICE_TYPES[number];

// ✅ DO: Export types and interfaces
export interface DeviceConfig {
  id: string;
  name: string;
  viewport: { width: number; height: number; };
}
```

### Import Organization
```typescript
// 1. React/External libraries
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { create } from 'zustand';

// 2. Internal components/hooks
import { DeviceSelector } from '../components/DeviceSelector';
import { useScreenshot } from '../hooks/useScreenshot';

// 3. Services/utilities
import { apiService } from '../services/apiService';
import { formatDeviceName } from '../utils/deviceUtils';

// 4. Types
import type { DeviceConfig, ScreenshotResult } from '../types';
```

## 🎯 Component Patterns

### Loading States
```typescript
const ScreenshotButton: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateScreenshot();
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Button 
      onClick={handleGenerate}
      disabled={isGenerating}
    >
      {isGenerating ? 'Generating...' : 'Generate Screenshot'}
    </Button>
  );
};
```

### Error Handling
```typescript
const useApiCall = <T>(apiCall: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const execute = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return { data, error, isLoading, execute };
};
```

## 🎨 Styling Guidelines

### MUI Theme Structure
```typescript
// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  },
  typography: {
    h1: { fontSize: '2.5rem' },
    body1: { fontSize: '1rem' }
  },
  spacing: 8 // 8px base unit
});

// Usage in components
<Box sx={{ 
  p: 2,           // padding: 16px
  mb: 3,          // margin-bottom: 24px
  bgcolor: 'primary.main' 
}}>
```

### Component Styling
```typescript
// Prefer sx prop for simple styles
<Typography sx={{ color: 'primary.main', mb: 2 }}>
  Title
</Typography>

// Use styled components for complex/reusable styles
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.grey[100]
  }
}));
```

## 📁 Page Structure

### Gatsby Page Template
```typescript
// src/pages/device-testing.tsx
import React from 'react';
import { PageProps } from 'gatsby';
import { Layout } from '../components/layout/Layout';
import { DeviceTestingDashboard } from '../components/features/DeviceTestingDashboard';

const DeviceTestingPage: React.FC<PageProps> = () => {
  return (
    <Layout title="Device Testing">
      <DeviceTestingDashboard />
    </Layout>
  );
};

export default DeviceTestingPage;

// Add page metadata for SEO
export const Head = () => (
  <title>Device Testing - Responsiveness Engine</title>
);
```

## 🔧 Development Workflow

### Git Workflow
1. Create feature branch: `feature/device-selector`
2. Make atomic commits with clear messages
3. Test locally before pushing
4. Create PR with description

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Components are properly tested
- [ ] No console.logs in production code
- [ ] Loading/error states are handled
- [ ] Responsive design works on mobile
- [ ] Accessibility basics (alt tags, labels)

## 🧪 Testing Strategy

### Component Testing
```typescript
// Basic component test structure
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeviceSelector } from './DeviceSelector';

describe('DeviceSelector', () => {
  it('renders device list correctly', () => {
    render(<DeviceSelector devices={mockDevices} onSelect={jest.fn()} />);
    expect(screen.getByText('iPhone 12')).toBeInTheDocument();
  });
  
  it('calls onSelect when device is clicked', async () => {
    const onSelect = jest.fn();
    render(<DeviceSelector devices={mockDevices} onSelect={onSelect} />);
    
    await userEvent.click(screen.getByText('iPhone 12'));
    expect(onSelect).toHaveBeenCalledWith(mockDevices[0]);
  });
});
```

## 📋 Quick Reference

### Common Commands
```bash
# Development
npm run develop      # Start dev server
npm run build       # Build for production
npm run typecheck   # Check TypeScript types
npm run lint        # Run ESLint

# Testing
npm test            # Run tests
npm test -- --watch # Watch mode
```

### File Extensions
- `.tsx` - React components
- `.ts` - TypeScript utilities/services
- `.js` - Gatsby configuration files
- `.md` - Documentation

### Environment Variables
```bash
# .env.development
GATSBY_API_URL=http://localhost:8080
GATSBY_WEBSOCKET_URL=ws://localhost:8080

# Usage in code
const apiUrl = process.env.GATSBY_API_URL;
```

## 🤝 Team Guidelines

1. **Keep it simple** - Prefer simple solutions over complex ones
2. **Document as you go** - Add JSDoc comments for complex functions
3. **Ask questions early** - Don't struggle alone
4. **Review code together** - Learn from each other
5. **Mobile-first** - Always consider mobile users

## 🚀 Getting Started

1. Read this guide
2. Check existing components before creating new ones
3. Follow the folder structure
4. Write TypeScript with proper types
5. Test your changes in multiple browsers
6. Update documentation if needed

Remember: **Code is read more than it's written**. Make it clear and maintainable!