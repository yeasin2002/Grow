# Grow

A routine-based productivity and task management application that emphasizes daily discipline and habit formation over traditional task completion.

Unlike conventional task managers, Grow focuses on consistency and structured planning through repeatable routines. The system helps users build long-term discipline by tracking behavior patterns rather than just checking off tasks.

## Product Architecture

```
Plan → Routine → Task → Timer → Activity Tracking
```

## Key Features

- **Routine Management** - Structured daily routines (Morning, Noon, Evening, Night) with embedded tasks
- **Study Time Tracker** - GitHub-style activity heatmap for consistency visualization
- **Plan Creation** - Build repeatable workflows with metadata and reminders
- **Focus Timer** - Task-linked timer with pause/resume controls and progress tracking
- **Notes System** - Quick notes and checklists for contextual support
- **Calendar View** - Monthly overview with task filtering (To do, Completed, Pending)

## Tech Stack

- **React Native 0.83** + **React 19** + **Expo 55** — latest stable stack
- **TypeScript 5** — strict mode with `noUncheckedIndexedAccess`
- **Expo Router 55** — file-based routing with typed routes
- **React Compiler** — enabled via Expo experiments
- **TailwindCSS 4** + **Uniwind** — utility-first styling for React Native
- **HeroUI Native** — component library with light/dark theming
- **Reanimated 4** + **Gesture Handler** — animations and gestures
- **Oxlint + Oxfmt** — fast linting and formatting via `ultracite`
- **Lefthook** — pre-commit hooks for lint/format on staged files
- **t3-env + Zod** — type-safe environment variables

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Run on a specific platform:

```bash
pnpm ios        # iOS simulator
pnpm android    # Android emulator
pnpm web        # Browser
```

## Available Scripts

```bash
pnpm dev              # Start Expo dev server (clears cache)
pnpm start            # Start Expo dev server
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
pnpm web              # Run in browser
pnpm check            # Lint + format check
pnpm fix              # Lint + format fix
pnpm check-types      # TypeScript type check (tsc --noEmit)
pnpm knip             # Dead code / unused exports check
```

## Project Structure

```
src/
  app/           # Expo Router screens (file-based routing)
  assets/        # Static assets (images, fonts)
  components/    # Shared UI components
  contexts/      # React context providers
  lib/           # Utility modules (env, helpers)
  global.css     # Tailwind + Uniwind + HeroUI style imports
```

## Development Guidelines

- Use `@/` path alias for imports from `src/` directory
- Leverage HeroUI Native components for consistent theming
- Use `cn()` helper for conditional class merging
- Strict TypeScript with `noUncheckedIndexedAccess` enabled
- React Compiler handles memoization automatically
- Follow file naming: PascalCase for components, kebab-case for utilities
