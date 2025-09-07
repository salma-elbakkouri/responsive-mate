# Project Setup Files Guide

## 📁 File Structure Overview

```
responsiveness-engine-frontend/
├── gatsby-config.ts           # Gatsby configuration
├── gatsby-browser.tsx         # Browser-side theme setup
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── src/
│   ├── components/
│   │   └── layout/
│   │       └── Layout.tsx    # Main app layout
│   ├── pages/
│   │   └── index.tsx         # Homepage
│   ├── services/
│   │   └── apiService.ts     # API communication
│   ├── store/
│   │   ├── deviceStore.ts    # Device state management
│   │   └── screenshotStore.ts# Screenshot state management
│   ├── styles/
│   │   └── theme.ts          # MUI theme configuration
│   └── types/
│       └── index.ts          # TypeScript type definitions
```

---

## 🚀 **Gatsby Configuration Files**

### `gatsby-config.ts`
**Purpose:** Main Gatsby configuration file  
**What it does:**
- Configures site metadata (title, description)
- Manages plugins (TypeScript, Emotion for MUI)
- Sets up GraphQL type generation

**Key features:**
```typescript
plugins: [
  'gatsby-plugin-typescript',  // TypeScript support
  'gatsby-plugin-emotion',     // MUI styling support
]
```

### `gatsby-browser.tsx` 
**Purpose:** Browser-side configuration and setup  
**What it does:**
- Wraps entire app with MUI ThemeProvider
- Loads Roboto fonts
- Applies CSS baseline for consistent styling

**Key features:**
```typescript
export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </ThemeProvider>
)
```

---

## 🎨 **Styling & Theme**

### `src/styles/theme.ts`
**Purpose:** MUI theme configuration  
**What it does:**
- Defines color palette (primary: blue, secondary: pink)
- Sets typography (Roboto font family)
- Customizes component styles (buttons, cards)
- Sets spacing and border radius

**Key features:**
- Professional color scheme
- Custom button styles (no text transform)
- Consistent spacing (8px grid)

---

## 🏪 **State Management (Zustand)**

### `src/store/deviceStore.ts`
**Purpose:** Device selection state management  
**What it does:**
- Tracks selected devices for testing
- Manages available device list
- Handles loading states and errors

**Key actions:**
- `addDevice()` - Add device to selection
- `removeDevice()` - Remove device
- `setLoading()` - Loading state
- `setError()` - Error handling

### `src/store/screenshotStore.ts`
**Purpose:** Screenshot generation state management  
**What it does:**
- Stores generated screenshots
- Tracks generation status
- Manages current URL being tested

**Key actions:**
- `addScreenshot()` - Add new screenshot
- `setStatus()` - Update generation status
- `setCurrentUrl()` - Set URL for testing
- `clearScreenshots()` - Clear all screenshots

---

## 📝 **TypeScript Types**

### `src/types/index.ts`
**Purpose:** Central type definitions  
**What it includes:**
- `DeviceConfig` - Device specifications
- `Screenshot` - Screenshot data structure
- `UrlValidationResult` - URL validation response
- `ApiResponse<T>` - Generic API response wrapper
- `LoadingState` - UI loading states

**Benefits:**
- Type safety across the entire app
- Better IDE autocomplete
- Prevents runtime type errors

---

## 🌐 **API Communication**

### `src/services/apiService.ts`
**Purpose:** Centralized backend communication  
**What it does:**
- Handles all HTTP requests to backend
- Provides type-safe API methods
- Manages error handling consistently

**Key methods:**
- `validateUrl()` - Check if URL is valid
- `getDevices()` - Fetch available devices
- `generateScreenshots()` - Create screenshots
- `getScreenshots()` - Retrieve screenshots

**Features:**
- Automatic error handling
- TypeScript return types
- Consistent API response format

---

## 🏗️ **Components**

### `src/components/layout/Layout.tsx`
**Purpose:** Main app layout wrapper  
**What it provides:**
- Consistent header across all pages
- Responsive container for content
- Clean, professional structure

**Features:**
- AppBar with app title
- Flexible main content area
- MUI Container for responsive layout

### `src/pages/index.tsx`
**Purpose:** Homepage component  
**What it shows:**
- Welcome message
- App description
- Call-to-action button
- Uses Layout component

---

## 📦 **Configuration Files**

### `package.json`
**Purpose:** Project dependencies and scripts  
**Key dependencies:**
- **Gatsby** - Static site generator
- **React** - UI framework
- **MUI** - Component library
- **Zustand** - State management
- **TypeScript** - Type safety

**Scripts:**
- `npm run develop` - Start dev server
- `npm run build` - Build for production
- `npm run typecheck` - Check TypeScript

### `tsconfig.json`
**Purpose:** TypeScript compiler configuration  
**Key settings:**
- Strict mode enabled
- JSX preserve mode for Gatsby
- Include `src/**/*` files
- Modern ES target

---

## 🎯 **How They Work Together**

1. **Gatsby** loads `gatsby-config.ts` for build configuration
2. **Browser startup** runs `gatsby-browser.tsx` to wrap app with theme
3. **Theme** from `src/styles/theme.ts` provides consistent styling
4. **Components** use MUI components styled by the theme
5. **State** managed by Zustand stores for device/screenshot data
6. **API calls** handled by centralized service with proper types
7. **Types** ensure everything is type-safe across the app

## 🚀 **Getting Started**

1. **Install dependencies:** `npm install`
2. **Start development:** `npm run develop`
3. **View site:** http://localhost:8000
4. **Make changes:** Edit any file and see hot reload
5. **Add features:** Follow the patterns established in these files

## 📚 **Next Steps**

- Add new pages to `src/pages/`
- Create components in `src/components/`
- Extend types in `src/types/`
- Add store actions for new features
- Customize theme colors/fonts
- Add new API endpoints in `apiService`