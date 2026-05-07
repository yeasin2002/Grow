<!-- product -->

# Product Overview

**grow** is a modern full-stack web application built with TypeScript. It's a monorepo project created with Better Fullstack that combines a Next.js frontend with a NestJS backend API.

## Key Features

- **Authentication System**: Built with Better Auth for secure user management
- **Database Integration**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Modern UI**: TailwindCSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query for async state management and data fetching
- **Type Safety**: Full TypeScript coverage across frontend and backend

## Architecture

The application follows a monorepo structure with clear separation between:

- **Frontend**: Next.js React application (port 3001)
- **Backend**: NestJS API server (port 3000)
- **Shared Packages**: Authentication, database, and configuration utilities

## Development Focus

This is a development-focused project emphasizing:

- Type safety and developer experience
- Modern tooling and build systems
- Clean architecture patterns
- Automated code quality checks

<!-- structure -->

# Project Structure

## Monorepo Organization

This project follows a standard monorepo structure with clear separation of concerns:

```
grow/
├── apps/                    # Application layer
│   ├── web/                # Next.js frontend application
│   └── server/             # NestJS backend API
├── packages/               # Shared packages
│   ├── auth/              # Authentication logic
│   ├── config/            # Shared configuration
│   ├── db/                # Database schema and queries
│   └── env/               # Environment variables
└── [config files]         # Root-level configuration
```

## Application Structure

### Frontend (`apps/web/`)

```
apps/web/
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── dashboard/     # Dashboard feature
│   │   ├── login/         # Authentication pages
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── [features]    # Feature-specific components
│   └── lib/              # Utility functions and configs
├── package.json
└── [config files]
```

### Backend (`apps/server/`)

```
apps/server/
├── src/
│   ├── lib/              # Shared utilities (logger, etc.)
│   ├── app.controller.ts # Main controller
│   ├── app.module.ts     # Root module
│   ├── app.service.ts    # Main service
│   └── index.ts          # Application entry point
├── dist/                 # Build output
├── package.json
└── [config files]
```

## Shared Packages

### Database (`packages/db/`)

- **Schema**: Drizzle schema definitions in `src/schema/`
- **Exports**: Database connection and schema exports
- **Docker**: Local PostgreSQL setup via docker-compose

### Authentication (`packages/auth/`)

- **Better Auth**: Configuration and setup
- **Exports**: Auth utilities and types

### Configuration (`packages/config/`)

- **TypeScript**: Base TypeScript configuration
- **Shared**: Common build and lint configurations

## File Naming Conventions

- **Components**: PascalCase for React components (`UserMenu.tsx`)
- **Files**: kebab-case for regular files (`auth-client.ts`)
- **Directories**: kebab-case for folders (`sign-in-form/`)
- **Pages**: Next.js convention (`page.tsx`, `layout.tsx`)

## Import Patterns

- **Workspace packages**: Use workspace protocol (`@grow/db`)
- **Relative imports**: Prefer absolute imports from `src/`
- **External packages**: Standard npm imports

## Configuration Files

- **Root level**: Monorepo-wide configuration (turbo.json, pnpm-workspace.yaml)
- **App level**: Application-specific configs (next.config.ts, tsconfig.json)
- **Package level**: Package-specific configurations

## Development Workflow

1. **Database first**: Start with schema changes in `packages/db/`
2. **API development**: Implement endpoints in `apps/server/`
3. **Frontend integration**: Build UI in `apps/web/`
4. **Shared utilities**: Extract common logic to `packages/`

## Build Outputs

- **Frontend**: `.next/` directory for Next.js build
- **Backend**: `dist/` directory for compiled TypeScript
- **Packages**: TypeScript source files (no build step required)

<!-- tech -->

# Technology Stack

## Build System & Package Management

- **Package Manager**: pnpm (v10.33.3)
- **Build System**: Turborepo for optimized monorepo builds
- **Node.js**: ESM modules (`"type": "module"`)

## Frontend Stack

- **Framework**: Next.js 16+ with React 19
- **Styling**: TailwindCSS 4+ with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Forms**: TanStack React Form
- **Icons**: Tabler Icons
- **Animations**: Motion (Framer Motion successor)
- **Theming**: next-themes for dark/light mode

## Backend Stack

- **Framework**: NestJS with Express
- **Runtime**: Node.js with tsx for development
- **Build Tool**: tsdown for production builds
- **Logging**: Pino with pino-http middleware

## Database & ORM

- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-kit
- **Containerization**: Docker Compose for local development

## Authentication

- **Library**: Better Auth for authentication and session management

## Code Quality & Tooling

- **Linting**: Oxlint with TypeScript, Unicorn, and OXC plugins
- **Formatting**: Oxfmt
- **Git Hooks**: Lefthook for pre-commit checks
- **TypeScript**: Latest version with strict type checking

## Common Commands

### Development

```bash
# Start all applications
pnpm run dev

# Start specific applications
pnpm run dev:web      # Frontend only (port 3001)
pnpm run dev:server   # Backend only (port 3000)
```

### Database Operations

```bash
pnpm run db:start     # Start PostgreSQL container
pnpm run db:push      # Push schema changes
pnpm run db:studio    # Open Drizzle Studio
pnpm run db:generate  # Generate migrations
pnpm run db:migrate   # Run migrations
pnpm run db:stop      # Stop containers
```

### Build & Quality

```bash
pnpm run build       # Build all applications
pnpm run check-types # TypeScript type checking
pnpm run check       # Run linting and formatting
```

## Port Configuration

- **Frontend (web)**: http://localhost:3001
- **Backend (server)**: http://localhost:3000
- **Database Studio**: Available via `pnpm run db:studio`
