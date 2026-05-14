This is a monorepo project, and it contains several other applications. They have their own agenda.md file that shows details, so whenever working on any specific app Make sure to read their README files and AGENTS.md for Guidelines

Here are all rules of specific apps 
- Mobile: apps/mobile/@AGENTS.md
- Server: apps/server/@AGENTS.md
- web: apps/web/@AGENTS.md
<!-- and so on just like this -->


<!-- BEGIN:Product -->

# Product: Grow

Grow is a **routine-based productivity and task management app** for mobile (iOS/Android/Web). It emphasizes daily discipline and habit formation over traditional task completion.

## Core Philosophy

Unlike conventional task managers, Grow focuses on consistency through repeatable routines. Users build long-term discipline by tracking behavior patterns, not just checking off tasks.

## Product Architecture

```
Plan → Routine → Task → Timer → Activity Tracking
```

## Key Features

- **Routine Management** — Structured daily routines (Morning, Noon, Evening, Night) with embedded tasks
- **Focus Timer** — Task-linked timer with pause/resume controls and progress tracking
- **Activity Heatmap** — GitHub-style consistency visualization for streaks and goal tracking
- **Calendar View** — Monthly overview with task filtering (To do / Completed / Pending)
- **Notes System** — Quick notes and checklists for contextual support
- **Plan Creation** — Build repeatable workflows with metadata and reminders

## Target Users

- Students and competitive exam learners
- Self-learners and knowledge workers
- Freelancers and developers seeking structured workflows

## App Identity

- App name: **Grow**
- Scheme: `grow`
- Android package: `com.yeasin2002.dev.Grow`

<!-- END:Product -->

<!-- BEGIN:tech -->

# Tech Stack

## Core

- **React Native 0.83** + **React 19** — cross-platform mobile framework
- **Expo 55** — managed workflow, dev tooling, and native APIs
- **TypeScript 5** — strict mode, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`
- **Expo Router 55** — file-based routing with typed routes enabled

## Styling & UI

- **TailwindCSS 4** + **Uniwind** — utility-first styling for React Native via `className` prop
- **HeroUI Native** — component library with built-in light/dark theming
- **Tailwind Variants** — complex component variant management
- **`cn()`** from `heroui-native` — conditional class merging helper
- Avoid `StyleSheet.create()` — use Tailwind `className` instead

## Animation & Gestures

| Use case                                  | Library                        |
| ----------------------------------------- | ------------------------------ |
| Fade, slide, scale on state change        | `react-native-ease`            |
| Gesture-driven / scroll-linked animations | Reanimated 4 + Gesture Handler |
| Layout enter/exit animations              | Reanimated 4                   |
| Shared element transitions                | Reanimated 4.2+                |

- **React Native Reanimated 4** — UI thread animations via worklets
- **React Native Gesture Handler** — native gesture system (always pair with Reanimated)
- **react-native-ease** — default choice for simple declarative animations

## Navigation & Layout

- **Expo Router** — file-based routing (stack + tab navigation)
- **React Navigation** — drawer support
- **React Native Safe Area Context** — `useSafeAreaInsets()` for notch/safe area spacing
- **React Native Keyboard Controller** — keyboard management

## State & Data

- **React Compiler** — enabled via Expo experiments; handles memoization automatically — avoid manual `useMemo`/`useCallback` unless necessary
- **t3-env + Zod** — type-safe environment variable validation (`src/lib/env.ts`)
- **Expo Secure Store** — encrypted local storage

## Icons

Import `Icons` from `@/lib` — pre-configured `@expo/vector-icons` with Uniwind support.

```tsx
import { Icons } from "@/lib";
<Icons className="text-background" name="flame" size={24} />;
```

Do **not** wrap `@expo/vector-icons` manually with `withUniwind` — they already support `className`.

## Build System

- **pnpm 9** — package manager (Node >=18 required)
- **Turbo 2.9** — monorepo task orchestration
- **Metro** — React Native bundler, configured with Reanimated + Uniwind wrappers
- **Biome 2.4.7** — linting and formatting (tab indentation, double quotes)
- **Lefthook** — pre-commit hooks (runs Biome on staged files)
- **Knip** — dead code and unused export detection

## Common Commands

Run these from `apps/mobile/`:

```bash
# Development
pnpm dev              # Start Expo dev server (clears cache)
pnpm start            # Start Expo dev server
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
pnpm web              # Run in browser

# Code Quality
pnpm check            # Lint + format check (Biome)
pnpm fix              # Auto-fix lint + format issues
pnpm check-types      # TypeScript type check (tsc --noEmit)
pnpm knip             # Find dead code and unused exports

# Build
pnpm prebuild         # Generate native projects
```

From the monorepo root:

```bash
pnpm build            # Build all apps (turbo)
pnpm lint             # Lint all apps (turbo)
pnpm format           # Format all files (prettier)
pnpm check-types      # Type check all apps (turbo)
```

## Key Config Files

| File              | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `app.config.ts`   | Expo config — typed routes, React Compiler, scheme       |
| `metro.config.js` | Metro bundler — Reanimated + Uniwind integration         |
| `tsconfig.json`   | Strict TS, path alias `@/*` → `./src/*`                  |
| `biome.json`      | Linter/formatter config                                  |
| `lefthook.yml`    | Pre-commit hooks                                         |
| `src/global.css`  | Global styles — Tailwind → Uniwind → HeroUI import order |

<!-- END:tech -->

<!-- BEGIN:structure -->

# Project Structure

## Monorepo Layout

```
/
├── apps/
│   └── mobile/          # Expo React Native app (primary app)
├── turbo.json           # Turbo task pipeline config
├── package.json         # Root workspace scripts
└── pnpm-workspace.yaml  # pnpm workspace definition
```

## Mobile App (`apps/mobile/src/`)

```
src/
├── app/                 # Expo Router screens (file-based routing)
├── assets/              # Static assets (images, icons, splash)
├── components/          # Shared UI components
├── contexts/            # React context providers
├── data/                # Static data and constants
├── api/                 # API hooks and queries
├── feature/             # Page-specific feature components
├── lib/                 # Utility modules and helpers
└── global.css           # Global styles (Tailwind → Uniwind → HeroUI)
```

## Routing (`src/app/`)

File-based routing via Expo Router. Current implemented routes:

```
src/app/
├── _layout.tsx          # Root layout — Stack + BottomNavigation
├── index.tsx            # Home screen (/)
├── +not-found.tsx       # 404 screen
├── activity/index.tsx   # Activity heatmap (/activity)
├── calendar/index.tsx   # Calendar view (/calendar)
├── timer/index.tsx      # Focus timer (/timer)
├── notes/
│   ├── index.tsx        # Notes list (/notes)
│   └── [id].tsx         # Note detail (/notes/:id)
└── notifications/index.tsx
```

Planned routes (see `PROJECT-ROUTES.MD`): `/plans`, `/routines`, `/settings`.

## Feature Components (`src/feature/`)

Page-specific components live here, grouped by screen. Each feature folder maps to a route.

```
src/feature/
├── homepage/            # Home screen components
├── activity/            # Activity heatmap components
├── notes/               # Notes list components
└── note-detail/         # Note detail components
```

- If a screen has multiple components, create a folder: `src/feature/[screen-name]/`
- If a screen has only one component, no need for a subfolder
- Export via `index.ts` for clean imports

## Shared Components (`src/components/`)

```
src/components/
├── common/
│   └── root-wrapper.tsx     # App provider tree (GestureHandler → SafeArea → Keyboard → Theme → HeroUI)
└── shared/
    ├── bottom-navigation.tsx
    └── heatmap-graph.tsx
```

Use `src/components/shared/` for components reused across multiple screens.

## Contexts (`src/contexts/`)

Global state via React Context. Current providers:

- `app-theme-context.tsx` — light/dark theme via Uniwind (`useAppTheme()` hook)

Context pattern:

- Export both a provider component and a custom hook
- Hook throws if used outside its provider
- Wrap context value in `useMemo`

## Utilities (`src/lib/`)

- `env.ts` — type-safe env vars via t3-env + Zod
- `icon-with-uniwind.tsx` — exports `Icons` component (use this, not raw `@expo/vector-icons`)
- `index.ts` — barrel export

## Data (`src/data/`)

Static constants and configuration data:

- `nav.data.ts` — navigation items for bottom nav and action menu
- Use `satisfies` for type-safe data definitions; export as `readonly` arrays

## API (`src/api/`)

```
src/api/
├── hooks/       # React hooks for data fetching
└── queries/     # Query definitions
```

## File Naming Conventions

| Type           | Convention              | Example                                |
| -------------- | ----------------------- | -------------------------------------- |
| Components     | kebab-case              | `task-item.tsx`, `note-card.tsx`       |
| Contexts       | kebab-case + `-context` | `app-theme-context.tsx`                |
| Utilities      | kebab-case              | `env.ts`, `format-date.ts`             |
| Data files     | kebab-case + `.data`    | `nav.data.ts`                          |
| Route files    | Expo Router syntax      | `index.tsx`, `[id].tsx`, `_layout.tsx` |
| Barrel exports | `index.ts`              | `index.ts`                             |

## Import Conventions

- Use `@/` alias for all imports from `src/` (e.g., `@/components/shared`, `@/lib`)
- Prefer named exports over default exports
- Use `import type` for TypeScript-only imports
- Import order: React → third-party → local components → types

## Bottom Navigation

The bottom nav shows on: `/`, `/notes`, `/calendar`. It is hidden on all other routes. Controlled in `src/app/_layout.tsx` via `shouldShowBottomNavigation`.

Primary tabs: Home, Note, Calendar  
Action menu (floating button): Notifications, Timer, Activity

<!-- END:structure -->

<!-- BEGIN:behavioral-guidelines -->

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked. If needed, then ask me first. 
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

<!-- END:behavioral-guidelines -->
