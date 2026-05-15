# Product Overview

Grow is a full-stack TypeScript application built with a modern monorepo architecture. The project provides a unified platform with three main applications:

- **Web Application**: Next.js-based frontend for browser access
- **Mobile Application**: React Native/Expo app for iOS and Android
- **Backend API**: NestJS server providing REST endpoints via TS-REST

## Core Features

- Type-safe API contracts shared across all platforms using TS-REST
- Authentication system powered by Better Auth
- PostgreSQL database with Drizzle ORM
- Shared business logic and API layer across web and mobile clients
- Modern UI with TailwindCSS, shadcn/ui (web), and heroui-native (mobile)

## Target Platforms

- Web browsers (via Next.js)
- iOS and Android devices (via Expo/React Native)
- Backend services (Node.js/NestJS)


<!-- 2.tech -->
# Technology Stack

## Build System & Tooling

- **Package Manager**: pnpm (v10.33.3)
- **Monorepo**: Turborepo with workspace configuration
- **TypeScript**: v6.0.3 (root), v5.9.3 (native app)
- **Linting**: Oxlint with TypeScript, Unicorn, and OXC plugins
- **Formatting**: Oxfmt for code formatting
- **Native Linting**: Biome for React Native app

## Frontend Stack

### Web (Next.js)
- **Framework**: Next.js 16.2.6
- **React**: 19.2.0
- **Styling**: TailwindCSS v4.3.0
- **UI Components**: shadcn/ui, Base UI, Lucide icons
- **State Management**: TanStack Query v5
- **Forms**: TanStack React Form
- **API Client**: TS-REST with React Query integration
- **Testing**: Vitest, Testing Library, MSW

### Mobile (React Native/Expo)
- **Framework**: Expo 55.0.12
- **React Native**: 0.83.4
- **React**: 19.2.0
- **Router**: Expo Router 55.0.11
- **Styling**: TailwindCSS v4.1.18 with Uniwind
- **UI Components**: heroui-native, Tabler icons
- **Animations**: React Native Reanimated 4.2.1, Gesture Handler
- **State Management**: TanStack Query
- **API Client**: TS-REST with React Query integration
- **Bottom Sheets**: Gorhom Bottom Sheet

## Backend Stack

- **Framework**: NestJS 11.1.19
- **Runtime**: Node.js with Express 5.2.1
- **API Layer**: TS-REST for type-safe contracts
- **Build Tool**: tsdown for bundling, tsx for development
- **Email**: AWS SES client

## Database & ORM

- **Database**: PostgreSQL (Docker-based)
- **ORM**: Drizzle ORM v0.45.2
- **Migrations**: Drizzle Kit v0.31.10
- **Client**: pg (node-postgres)

## Authentication

- **Library**: Better Auth v1.6.10
- **Integration**: @better-auth/expo for mobile

## Shared Packages

- **@grow/api**: Business logic and API contracts (TS-REST)
- **@grow/auth**: Authentication configuration
- **@grow/db**: Database schema and queries (Drizzle)
- **@grow/env**: Environment variable validation (Zod)
- **@grow/config**: Shared configuration

## Common Commands

### Development
```bash
# Start all apps
pnpm run dev

# Start specific app
pnpm run dev:web      # Web on port 3001
pnpm run dev:native   # Mobile with Expo
pnpm run dev:server   # Backend API on port 3000
```

### Database
```bash
pnpm run db:push      # Push schema changes
pnpm run db:studio    # Open Drizzle Studio
pnpm run db:generate  # Generate migrations
pnpm run db:migrate   # Run migrations
pnpm run db:start     # Start PostgreSQL (Docker)
pnpm run db:stop      # Stop PostgreSQL
pnpm run db:down      # Stop and remove containers
```

### Build & Type Checking
```bash
pnpm run build        # Build all apps
pnpm run check-types  # Type check all workspaces
```

### Code Quality
```bash
pnpm run check        # Run Oxlint and Oxfmt
```

### Mobile Specific
```bash
cd apps/native
pnpm run android      # Run on Android
pnpm run ios          # Run on iOS
pnpm run prebuild     # Generate native code
pnpm run check        # Run Biome checks
pnpm run fix          # Auto-fix with Biome
```

## Key Dependencies

- **Validation**: Zod v4.4.3
- **HTTP Client**: TS-REST core v3.52.1
- **Query Management**: TanStack Query v5.100.10
- **Testing**: Vitest v4.1.5, MSW v2.14.6
- **Type Safety**: TypeScript with strict mode


<!-- structure -->

# Project Structure

## Monorepo Organization

This is a pnpm workspace monorepo managed by Turborepo with the following top-level structure:

```
grow/
├── apps/           # Application packages
├── packages/       # Shared packages
├── .kiro/          # Kiro configuration and steering
├── turbo.json      # Turborepo configuration
└── pnpm-workspace.yaml
```

## Applications (`apps/`)

### `apps/web/` - Next.js Web Application
- **Port**: 3001
- **Entry**: Next.js app router
- **Key directories**:
  - `src/app/` - App router pages and layouts
  - `src/components/` - React components
  - `src/lib/` - Utility functions and helpers

### `apps/native/` - React Native Mobile Application
- **Framework**: Expo with Expo Router
- **Key directories**:
  - `src/app/` - Expo Router file-based routing
  - `src/components/` - Reusable React Native components
  - `src/feature/` - Feature-specific modules
  - `src/contexts/` - React context providers
  - `src/lib/` - Utility functions
  - `src/api/` - API client setup
  - `src/assets/` - Images, fonts, and static files
  - `src/data/` - Static data and constants
  - `.agents/skills/` - AI agent skills for development assistance
  - `docs/` - Documentation files

### `apps/server/` - NestJS Backend API
- **Port**: 3000
- **Entry**: `src/index.ts`
- **Key directories**:
  - `src/` - NestJS modules, controllers, and services
  - `dist/` - Compiled output (generated)

## Shared Packages (`packages/`)

### `packages/api/` - API Layer
- **Purpose**: Business logic and TS-REST API contracts
- **Exports**: Type-safe API definitions shared across all apps
- **Dependencies**: Uses `@grow/auth`, `@grow/db`, `@grow/env`

### `packages/auth/` - Authentication
- **Purpose**: Better Auth configuration and utilities
- **Usage**: Shared authentication logic for web, mobile, and server

### `packages/db/` - Database Layer
- **Purpose**: Drizzle ORM schema and database queries
- **Key files**:
  - `src/schema/` - Database table definitions
  - `src/index.ts` - Database client exports
  - `drizzle.config.ts` - Drizzle Kit configuration
  - `docker-compose.yml` - PostgreSQL container setup

### `packages/env/` - Environment Variables
- **Purpose**: Centralized environment variable validation using Zod
- **Usage**: Type-safe environment access across all packages

### `packages/config/` - Shared Configuration
- **Purpose**: Shared TypeScript, ESLint, and build configurations
- **Usage**: Extended by individual apps for consistent tooling

## Workspace Dependencies

Packages reference each other using workspace protocol:
- `"@grow/api": "workspace:*"`
- `"@grow/auth": "workspace:*"`
- `"@grow/db": "workspace:*"`
- `"@grow/env": "workspace:*"`
- `"@grow/config": "workspace:*"`

## Build Outputs

- **Web**: `.next/` directory (gitignored)
- **Server**: `dist/` directory (gitignored)
- **Native**: `.expo/` directory (gitignored)

## Configuration Files

### Root Level
- `turbo.json` - Turborepo task pipeline and caching
- `pnpm-workspace.yaml` - Workspace packages and catalog dependencies
- `.oxlintrc.json` - Oxlint configuration
- `.oxfmtrc.json` - Oxfmt configuration
- `.dockerignore` - Docker build exclusions

### App-Specific
- `apps/web/next.config.js` - Next.js configuration
- `apps/native/app.config.ts` - Expo configuration
- `apps/native/metro.config.js` - Metro bundler configuration
- `apps/native/biome.json` - Biome linter/formatter for native app

## Import Conventions

- **Workspace packages**: Use `@grow/*` imports
  ```typescript
  import { api } from '@grow/api';
  import { db } from '@grow/db';
  ```

- **Relative imports**: Use for local files within the same package
  ```typescript
  import { Button } from '@/components/Button';
  import { utils } from '@/lib/utils';
  ```

## File Naming Conventions

- **React components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Utilities/helpers**: camelCase (e.g., `formatDate.ts`, `apiClient.ts`)
- **Configuration**: kebab-case (e.g., `app.config.ts`, `metro.config.js`)
- **Types**: PascalCase with `.types.ts` suffix (e.g., `User.types.ts`)

## Key Patterns

- **Type Safety**: All API contracts defined in `@grow/api` using TS-REST
- **Database Access**: All queries go through `@grow/db` package
- **Environment Variables**: Validated through `@grow/env` package
- **Authentication**: Centralized in `@grow/auth` package
- **Shared Logic**: Business logic in `@grow/api`, consumed by all apps
