# Grow - Routine-Based Productivity App

A routine-based productivity and task management application that emphasizes daily discipline and habit formation over traditional task completion. Unlike conventional task managers, Grow focuses on consistency and structured planning through repeatable routines.

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

## What's inside?

This monorepo includes the following apps and packages:

### Apps and Packages

- `mobile`: React Native/Expo app - the primary mobile application
- `server`: NestJS backend API for data persistence and sync
- `@repo/ui`: Shared React component library
- `@repo/eslint-config`: ESLint configurations (base, next-js, react-internal)
- `@repo/typescript-config`: Shared TypeScript configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) with strict mode enabled.

### Tech Stack

**Mobile App (Primary Platform):**
- React Native 0.83 + Expo 55
- React 19.2.0 with React Compiler
- TypeScript 5.9.2 (strict mode + noUncheckedIndexedAccess)
- Expo Router 55 (file-based routing)
- TailwindCSS 4 + Uniwind + HeroUI Native
- Reanimated 4 + Gesture Handler

**Backend:**
- NestJS 11 with TypeScript
- Express-based RESTful API
- Jest for testing

**Monorepo Tools:**
- [Turborepo](https://turborepo.dev/) for build orchestration
- [pnpm](https://pnpm.io/) for package management (required)
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) + [Biome](https://biomejs.dev/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Lefthook](https://github.com/evilmartians/lefthook) for pre-commit hooks

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm 9.0.0 (required package manager)

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers for all apps
pnpm dev

# Or start specific apps
pnpm dev --filter=mobile    # Mobile app only
pnpm dev --filter=server    # Server only
```

### Mobile Development

```bash
cd apps/mobile

# Start Expo development server
pnpm dev                   # With cache clearing
pnpm start                 # Standard start

# Run on specific platforms
pnpm ios                   # iOS simulator
pnpm android               # Android emulator
pnpm web                   # Browser
```

### Build

To build all apps and packages:

```bash
# Build everything
pnpm build

# Build specific apps
pnpm build --filter=mobile
pnpm build --filter=server
```

### Development

To develop all apps and packages:

```bash
# Start all development servers
pnpm dev

# Develop specific apps
pnpm dev --filter=mobile
pnpm dev --filter=server
```

### Code Quality

```bash
# Lint all workspaces
pnpm lint

# Format all files
pnpm format

# Type check all workspaces
pnpm check-types
```

### Mobile App Commands

```bash
cd apps/mobile

# Code quality
pnpm check                 # Biome lint + format check
pnpm fix                   # Biome lint + format fix
pnpm check-types           # TypeScript type check
pnpm knip                  # Dead code analysis
```

### Server Commands

```bash
cd apps/server

# Development
pnpm dev                   # NestJS watch mode
pnpm start:debug           # Debug mode

# Testing
pnpm test                  # Run tests
pnpm test:watch            # Watch mode
pnpm test:cov              # Coverage report
```

## Project Structure

```
├── apps/
│   ├── mobile/                    # React Native/Expo app (primary)
│   └── server/                    # NestJS backend API
├── packages/
│   ├── ui/                        # Shared React components
│   ├── eslint-config/             # ESLint configurations
│   └── typescript-config/         # TypeScript configurations
├── turbo.json                     # Turborepo configuration
└── package.json                   # Root workspace config
```

### Mobile App Structure

```
apps/mobile/src/
├── app/                          # Expo Router screens (file-based routing)
├── components/                   # Reusable UI components
├── feature/                      # Feature-specific components
├── contexts/                     # React Context providers
├── lib/                          # Utility modules
├── data/                         # Static data and constants
└── assets/                       # Static assets
```

## Development Guidelines

- Use `@/` path alias for imports from `src/` directory (mobile app)
- Follow PascalCase for components, kebab-case for utilities
- Leverage HeroUI Native components for consistent theming
- Use `cn()` helper for conditional class merging
- Strict TypeScript with `noUncheckedIndexedAccess` enabled
- React Compiler handles memoization automatically

## Remote Caching

Turborepo can use [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```bash
# Authenticate with Vercel
pnpm exec turbo login

# Link your Turborepo to Remote Cache
pnpm exec turbo link
```

## Contributing

1. **Feature Development**: Start in `apps/mobile/src/feature/` for new features
2. **Shared Components**: Extract to `apps/mobile/src/components/shared/` when reused
3. **Cross-App Components**: Move to `packages/ui/` when needed by multiple apps
4. **Routing**: Add new screens in `apps/mobile/src/app/` following Expo Router conventions
5. **Data Layer**: Add API calls in `apps/mobile/src/api/` with hooks pattern

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.dev/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.dev/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.dev/docs/reference/configuration)
- [CLI Usage](https://turborepo.dev/docs/reference/command-line-reference)
