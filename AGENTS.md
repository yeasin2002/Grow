<!-- Product -->

# Product Overview

Grow is a routine-based productivity and task management application that emphasizes daily discipline and habit formation over traditional task completion.

## Core Philosophy

Unlike conventional task managers, Grow focuses on consistency and structured planning through repeatable routines. The system helps users build long-term discipline by tracking behavior patterns rather than just checking off tasks.

## Key Features

- **Routine Management**: Structured daily routines (Morning, Noon, Evening, Night) with embedded tasks
- **Study Time Tracker**: GitHub-style activity heatmap for consistency visualization
- **Plan Creation**: Build repeatable workflows with metadata and reminders
- **Focus Timer**: Task-linked timer with pause/resume controls and progress tracking
- **Notes System**: Quick notes and checklists for contextual support
- **Calendar View**: Monthly overview with task filtering (To do, Completed, Pending)

## Product Architecture

```
Plan → Routine → Task → Timer → Activity Tracking
```

## Target Users

- Students and competitive exam learners
- Self-learners and knowledge workers
- Freelancers and developers seeking structured workflows

## Unique Value

Combines planning, execution, tracking, and reflection layers into a unified system that encourages disciplined behavior and long-term consistency.

<!-- Structure -->

# Project Structure

## Directory Organization

```
src/
├── app/              # Expo Router screens (file-based routing)
├── assets/           # Static assets (images, fonts)
├── components/       # Shared UI components
├── contexts/         # React context providers
├── lib/              # Utility modules and helpers
└── global.css        # Global styles (Tailwind + Uniwind + HeroUI)
```

## Routing Convention

Expo Router uses file-based routing in `src/app/`:

- `index.tsx` - Home screen (route: `/`)
- `_layout.tsx` - Root layout wrapper
- `+not-found.tsx` - 404 screen
- Folders create nested routes
- `(group)` syntax for route groups without affecting URL structure

## Component Architecture

### Shared Components (`src/components/`)

Reusable UI components used across multiple screens:

- `container.tsx` - Layout wrapper with safe area handling and optional scrolling
- `theme-toggle.tsx` - Theme switcher component

**Component Patterns**:

- Use `cn()` from `heroui-native` for conditional class merging
- Leverage `useSafeAreaInsets()` for proper spacing on notched devices
- Prefer `Animated.createAnimatedComponent()` for animated wrappers
- Export typed props interfaces for component APIs

### Context Providers (`src/contexts/`)

Global state management via React Context:

- `app-theme-context.tsx` - Theme management (light/dark mode)

**Context Patterns**:

- Export both provider component and custom hook
- Throw error if hook used outside provider
- Use `useMemo` for context value to prevent unnecessary re-renders
- Wrap callbacks with `useCallback` for stable references

## Utilities (`src/lib/`)

Shared utility functions and configurations:

- `env.ts` - Type-safe environment variable validation using t3-env + Zod

**Utility Patterns**:

- Keep utilities pure and side-effect free
- Export typed interfaces for better IDE support
- Use Zod schemas for runtime validation

## Assets (`src/assets/`)

Static resources organized by type:

- `images/` - App icons, splash screens, logos, and image assets

**Asset Conventions**:

- Use `@2x` and `@3x` suffixes for high-DPI variants
- Store platform-specific icons (Android/iOS) with descriptive names
- Reference via `require()` or Expo's asset system

## Styling Architecture

### Global Styles (`src/global.css`)

Imports in order:

1. TailwindCSS base
2. Uniwind React Native integration
3. HeroUI Native component styles
4. HeroUI source path for component resolution

### Component Styling

- Use `className` prop with Tailwind utilities
- Use `cn()` helper for conditional classes
- Leverage HeroUI Native components for consistent theming
- Use `tailwind-variants` for complex component variants

## Import Conventions

- Use `@/` path alias for imports from `src/` directory
- Prefer named exports over default exports for better refactoring
- Group imports: React → Third-party → Local components → Types
- Use `type` imports for TypeScript types: `import type { Props } from '...'`

## File Naming

- Components: PascalCase (e.g., `Container.tsx`, `ThemeToggle.tsx`)
- Utilities: kebab-case (e.g., `env.ts`, `format-date.ts`)
- Contexts: kebab-case with `-context` suffix (e.g., `app-theme-context.tsx`)
- Routes: kebab-case or special Expo Router syntax (e.g., `index.tsx`, `_layout.tsx`)

## Type Safety

- Enable strict TypeScript checks (`noUncheckedIndexedAccess`, `strict`)
- Define prop interfaces for all components
- Use Zod for runtime validation (env vars, API responses)
- Leverage Expo Router's typed routes for navigation

<!-- Tech -->

# Tech Stack

## Core Framework

- **React Native 0.83** with **React 19** - Latest stable cross-platform framework
- **Expo 55** - Development platform with managed workflow
- **TypeScript 5** - Strict mode with `noUncheckedIndexedAccess` enabled
- **Expo Router 55** - File-based routing with typed routes

## Styling & UI

- **TailwindCSS 4** - Utility-first CSS framework
- **Uniwind** - TailwindCSS integration for React Native
- **HeroUI Native** - Component library with light/dark theme support
- **Tailwind Variants** - Component variant management
- **Tailwind Merge** - Utility class merging

## Animation & Gestures

- **React Native Reanimated 4** - High-performance animations
- **React Native Gesture Handler** - Native gesture system
- **React Native Worklets** - JavaScript worklets for animations

## Navigation & Layout

- **React Navigation** - Drawer and navigation elements
- **React Native Screens** - Native screen optimization
- **React Native Safe Area Context** - Safe area handling
- **React Native Keyboard Controller** - Keyboard management

## State & Data

- **React Compiler** - Enabled via Expo experiments for automatic memoization
- **t3-env + Zod** - Type-safe environment variable validation
- **Expo Secure Store** - Encrypted local storage

## Development Tools

- **Lefthook** - Git hooks for pre-commit linting/formatting
- **Knip** - Dead code and unused exports detection
- **Biome** - Additional code quality tooling

## Build System

- **Metro** - React Native bundler with custom config for Reanimated and Uniwind
- **pnpm** - Fast, disk-efficient package manager
- **Monorepo** - Workspace configuration via `pnpm-workspace.yaml`

## Common Commands

```bash
# Development
pnpm dev              # Start dev server with cache cleared
pnpm start            # Start dev server
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
pnpm web              # Run in browser

# Code Quality
pnpm check            # Run lint + format check
pnpm fix              # Auto-fix lint + format issues
pnpm check-types      # TypeScript type checking (tsc --noEmit)
pnpm knip             # Find dead code and unused exports

# Build
pnpm prebuild         # Generate native projects
```

## Configuration Files

- `app.json` - Expo configuration with typed routes and React Compiler experiments
- `metro.config.js` - Metro bundler config with Reanimated and Uniwind integration
- `tsconfig.json` - Strict TypeScript with path aliases (`@/*` → `./src/*`)
- `biome.jsonc` - Biome configuration
- `lefthook.yml` - Pre-commit hooks for oxlint and oxfmt
- `.env` - Environment variables (validated via t3-env)

## Key Conventions

- **Strict TypeScript**: All indexed access must be checked (`noUncheckedIndexedAccess`)
- **Path Aliases**: Use `@/` prefix for imports from `src/` directory
- **React Compiler**: Automatic memoization enabled - avoid manual `useMemo`/`useCallback` unless necessary
- **Styling**: Use Tailwind utility classes via `className` prop
- **Theme Support**: Light/dark themes managed via Uniwind and HeroUI
