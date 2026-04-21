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

### Route Planning 
in there `PROJECT-ROUTES.MD` we have covered all feature plans of this app routes. But 

Expo Router uses file-based routing in `src/app/`:

- `index.tsx` - Home screen (route: `/`)
- `_layout.tsx` - Root layout wrapper
- `+not-found.tsx` - 404 screen
- Folders create nested routes
- `(group)` syntax for route groups without affecting URL structure

## Component Architecture

### Page based components. 
- all page specific components live in `src/feature`, make sure if there's only one component do not need to create another feature folders. 

- Example: 
 - homepage 
  component path: `src/feature/homepage`
 -  auth: all auth related like login, register etc. 
    component path: `src/feature/auth`

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

### Available Animation Libraries
- **React Native Reanimated 4** - High-performance animations
- **React Native Gesture Handler** - Native gesture system
- **react-native-ease** - Easing functions for animations 

Rules to use animation libraries: 
- Something bouncing, fading, sliding on a button press? → react-native-ease
- Gesture-driven pan/pinch/swipe animations? → Reanimated + Gesture Handler
- Shared element transitions between screens? → Reanimated 4

### Details in table

| Feature | react-native-ease | Reanimated 4 | Gesture Handler |  |
|---|---|---|---|---|
| **Purpose** | Declarative UI animations | Complex animations on UI thread | Native gesture input | 
| **Complexity** | ⭐ Very simple | ⭐⭐⭐ Complex | ⭐⭐ Moderate | 
| **Performance** | 🟢 Native APIs, zero JS | 🟢 UI thread via worklets | 🟢 Native thread | 
| **Bundle Impact** | 🟢 Minimal | 🔴 Significant (C++ runtime) | 🟡 Moderate | 
| **Gesture-driven** | ❌ No | ✅ Yes (with RNGH) | ✅ Yes | 
| **Layout animations** | ❌ No | ✅ Yes | ❌ No | 
| **Shared element** | ❌ No | ✅ Yes (v4.2+) | ❌ No | 
| **Sensor/Keyboard** | ❌ No | ✅ Yes | ❌ No | 
| **Spring physics** | ✅ Yes | ✅ Yes | ❌ No | 
| **New Arch required** | ✅ Yes | ✅ Yes | ✅ Yes (v3) | 
| **Babel plugin** | ❌ No | via worklets | ❌ No |
| **Direct usage in Grow** | ✅ Default choice | Complex interactions | With Reanimated |


### When to Use Which

### Use **react-native-ease** when:
- You need a fade, slide, scale, or color animation triggered by a state change
- The animation is not driven by gesture position
- You want clean, minimal code with no performance overhead
- Examples: modal appear/disappear, card expand, button press, tab transition, toast notifications

```typescript
// ✅ Perfect for react-native-ease
<EaseView
  animate={{ scale: isPressed ? 0.95 : 1, opacity: isPressed ? 0.8 : 1 }}
  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
>
  <Text>Press Me</Text>
</EaseView>
```

### Use **Reanimated 4** when:
- The animation values depend on gesture position (drag distance, velocity)
- You need layout animations (enter/exit animations for components)
- You need shared element transitions between screens
- You're animating something based on scroll position
- You need `useAnimatedStyle` to compute style on the UI thread

```typescript
// ✅ Perfect for Reanimated
const { useSharedValue, useAnimatedStyle, withSpring } = require('react-native-reanimated');

const offset = useSharedValue(0);
const style = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}));
```

### Use **Gesture Handler** when:
- You need pan, pinch, rotation, fling, or long-press gestures
- You need gesture composing (simultaneous or exclusive)
- Always pair with Reanimated for the animation itself

```typescript
// ✅ Always use Gesture Handler with Reanimated for gesture-driven animation
const pan = Gesture.Pan()
  .onUpdate((e) => { x.value = e.translationX; })
  .onEnd(() => { x.value = withSpring(0); });
```

### Use **react-native-worklets** when:
- You are consuming it indirectly through Reanimated (most common case)
- You need to write a custom function tagged with `'worklet';`
- You're building a library/utility that must run on the UI thread
- Rare: offloading non-animation CPU intensive tasks to a background Hermes runtime



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
- `lefthook.yml` - Pre-commit hooks 
- `.env` - Environment variables (validated via t3-env)

## Key Conventions

- **Strict TypeScript**: All indexed access must be checked (`noUncheckedIndexedAccess`)
- **Path Aliases**: Use `@/` prefix for imports from `src/` directory
- **React Compiler**: Automatic memoization enabled - avoid manual `useMemo`/`useCallback` unless necessary
- **Styling**: Use Tailwind utility classes via `className` prop
- **Theme Support**: Light/dark themes managed via Uniwind and HeroUI



<!-- Rules  -->

## Best Practices & Tips


### expo icon with tailwind
 Not need to use like this, withUniwind with @expo/vector-icons, they already support className by default.

```tsx
    import { Ionicons } from "@expo/vector-icons"; 
    import { withUniwind } from "uniwind";
    const StyledIonicons = withUniwind(Ionicons);
```

 Instead import it from `src\lib\with-uniwind.tsx` and use it like this:
 ```
import { Icons } from "@/lib";
 
 <Icons className="text-background" name="flame" size={24} />
```


 ### StyleSheet use 
 - Try to avoid StyleSheet.create/StyleSheet and instead of this use tailwindcss mostly with `className` prop.



### Behavioral guidelines

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.