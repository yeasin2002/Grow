# Product Overview

This is a **NestJS-based server application** that serves as part of the "grow" monorepo ecosystem. The server provides:

- **REST API endpoints** with CORS support for web applications
- **Authentication integration** via Better Auth library with dedicated auth routes (`/api/auth/*`)
- **Express.js integration** within the NestJS framework for flexible request handling
- **Structured logging** using Pino for production-ready observability

The application follows a modular architecture pattern typical of enterprise Node.js applications, with clear separation between controllers, services, and shared utilities.

## Key Features

- CORS-enabled API server
- Integrated authentication system
- Structured logging with environment-based configuration
- Docker containerization support
- TypeScript-first development

<!-- structure -->

# Project Structure

## Root Directory

```
├── src/                    # Source code
├── dist/                   # Build output (generated)
├── node_modules/           # Dependencies
├── .kiro/                  # Kiro configuration and steering
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tsdown.config.ts        # Build configuration
├── Dockerfile              # Container configuration
└── .env                    # Environment variables
```

## Source Code Organization (`src/`)

```
src/
├── index.ts               # Application entry point and bootstrap
├── app.module.ts          # Root NestJS module
├── app.controller.ts      # Root controller
├── app.service.ts         # Root service
└── lib/                   # Shared utilities
    └── logger.ts          # Pino logging configuration
```

## Architecture Patterns

### NestJS Module Structure

- **Modules** (`*.module.ts`) - Feature organization and dependency injection
- **Controllers** (`*.controller.ts`) - HTTP request handling and routing
- **Services** (`*.service.ts`) - Business logic and data processing
- **Shared utilities** in `src/lib/` - Cross-cutting concerns

### File Naming Conventions

- Use kebab-case for file names: `user-profile.service.ts`
- Suffix files by type: `.controller.ts`, `.service.ts`, `.module.ts`
- Use `index.ts` for barrel exports when needed

### Import Patterns

- Use path aliases: `import { logger } from "@/lib/logger"`
- Monorepo packages: `import { auth } from "@grow/auth"`
- Relative imports for same-directory files

### Bootstrap Pattern

The `src/index.ts` file follows this pattern:

1. Import reflect-metadata first (required for decorators)
2. Import monorepo dependencies
3. Create NestJS application
4. Configure CORS and middleware
5. Set up auth routes via Express integration
6. Start server on port 3000

### Logging Standards

- Use the centralized logger from `@/lib/logger`
- Create child loggers with context: `createChildLogger({ requestId })`
- Follow log levels: trace → debug → info → warn → error → fatal
- Include structured data in log objects

<!-- tech -->

# Technology Stack

## Core Framework & Runtime

- **NestJS** - Enterprise Node.js framework with decorators and dependency injection
- **Express.js** - HTTP server integration within NestJS
- **Node.js 20** - Runtime environment (Alpine Linux in Docker)
- **TypeScript 6.0.3** - Primary language with strict typing

## Build System & Tools

- **tsdown** - TypeScript bundler for production builds
- **tsx** - Development server with hot reload
- **Bun** - Alternative runtime for compilation (compile script)
- **pnpm** - Package manager (workspace-aware)

## Key Libraries

- **Better Auth** - Authentication system (`@grow/auth`)
- **Pino** - Structured logging with pino-pretty for development
- **Zod** - Runtime type validation
- **RxJS** - Reactive programming utilities
- **Reflect Metadata** - Decorator metadata support

## Monorepo Dependencies

- `@grow/auth` - Authentication module
- `@grow/db` - Database utilities
- `@grow/env` - Environment configuration
- `@grow/config` - Shared TypeScript configuration

## Common Commands

### Development

```bash
pnpm dev              # Start development server with hot reload
pnpm check-types      # Type checking without building
```

### Building

```bash
pnpm build           # Build for production using tsdown
pnpm compile         # Create standalone executable with Bun
```

### Production

```bash
pnpm start           # Start production server (requires build first)
```

## Configuration Notes

- Uses ES modules (`"type": "module"`)
- Path aliases: `@/*` maps to `./src/*`
- Experimental decorators enabled for NestJS
- Composite TypeScript project setup
- CORS configured for cross-origin requests
