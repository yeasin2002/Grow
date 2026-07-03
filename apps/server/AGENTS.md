# Product Overview

**Grow Server** is a NestJS-based backend application that provides API services for the Grow platform. The server handles authentication, email services, and core business logic.

## Key Features

- RESTful API endpoints using NestJS framework
- Authentication system powered by better-auth
- Email delivery via AWS SES (Simple Email Service)
- CORS-enabled for cross-origin requests
- Docker-ready for containerized deployment

## Architecture

The server follows a modular NestJS architecture with:
- Controllers for handling HTTP requests
- Services for business logic
- Shared workspace packages for auth, database, and API contracts
- Middleware integration for authentication routes


<!-- 2. tech -->

# Technology Stack

## Core Framework

- **NestJS** (v11.x) - Progressive Node.js framework for building server-side applications
- **Express** (v5.x) - Underlying HTTP server
- **TypeScript** (v6.x) - Type-safe JavaScript with ES modules

## Key Dependencies

### Authentication & Security
- **better-auth** - Authentication library
- **@grow/auth** - Workspace authentication package

### Database & Data
- **@grow/db** - Workspace database package
- **zod** - Schema validation

### API & Communication
- **@ts-rest/core** & **@ts-rest/serverless** - Type-safe REST API contracts
- **@grow/api** - Workspace API contracts

### Email Services
- **@aws-sdk/client-ses** - AWS Simple Email Service integration

### Environment & Configuration
- **@grow/env** - Workspace environment configuration
- **dotenv** - Environment variable management

## Build System

- **tsdown** - TypeScript bundler for production builds
- **tsx** - TypeScript execution for development
- **Bun** - Alternative runtime for compilation

## Testing

- **Vitest** - Fast unit test framework
- **MSW (Mock Service Worker)** - API mocking for tests
- **jsdom** - DOM implementation for testing
- **@vitest/ui** - Test UI dashboard
- **@vitest/coverage-v8** - Code coverage reporting

## Development Tools

- **TypeScript Compiler** - Type checking with `tsc`
- **Path Aliases** - `@/*` maps to `./src/*`
- **Decorators** - Experimental decorators enabled for NestJS

## Common Commands

```bash
# Development
bun dev                 # Start development server with hot reload (tsx watch)

# Building
bun build              # Build for production using tsdown
bun check-types        # Type check without emitting files
bun compile            # Compile to standalone binary with Bun

# Production
bun start              # Run production build (node dist/index.js)
```

## Docker Deployment

- Multi-stage Dockerfile optimized for production
- Uses Bun for dependency management
- Node 20 Alpine base image
- Exposes port 3000

## Configuration Notes

- **Module System**: ES modules (`"type": "module"`)
- **CORS**: Configured in bootstrap with origin, methods, and credentials
- **Port**: Default 3000
- **Decorators**: Required for NestJS dependency injection
- **Workspace Protocol**: Uses workspace packages with `workspace:*`


<!-- strcuture -->


# Project Structure

## Directory Layout

```
apps/server/
├── src/
│   ├── index.ts              # Application entry point and bootstrap
│   ├── app.module.ts         # Root NestJS module
│   ├── app.controller.ts     # Root controller
│   ├── app.service.ts        # Root service
│   ├── lib/                  # Shared utilities and libraries
│   │   └── email.ts          # AWS SES email service utilities
│   └── mocks/                # Testing mocks
│       ├── handlers.ts       # MSW request handlers
│       └── server.ts         # MSW server setup
├── dist/                     # Build output (generated)
├── node_modules/             # Dependencies (generated)
├── .env                      # Environment variables (not committed)
├── .gitignore
├── .dockerignore
├── Dockerfile                # Container configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── tsdown.config.ts          # Build configuration
```

## Source Organization

### Entry Point (`src/index.ts`)
- Imports `reflect-metadata` for decorator support
- Creates NestJS application instance
- Configures CORS with environment-based origins
- Mounts authentication routes at `/api/auth/*`
- Starts server on port 3000

### Module Structure
- **Root Module** (`app.module.ts`) - Registers controllers and providers
- **Controllers** - Handle HTTP requests and routing
- **Services** - Contain business logic and are injected via DI

### Library Code (`src/lib/`)
Reusable utilities and integrations:
- **email.ts** - AWS SES email functions with support for:
  - Simple emails (`sendEmail`)
  - Raw emails with attachments (`sendRawEmail`)
  - Batch email sending (`sendBatchEmails`)
  - Configurable recipients (to, cc, bcc, replyTo)

### Testing Infrastructure (`src/mocks/`)
- **handlers.ts** - Define MSW mock handlers for external API calls
- **server.ts** - Configure MSW server for Node.js test environment

## Workspace Integration

This server is part of a monorepo workspace and depends on:
- `@grow/api` - Shared API contracts
- `@grow/auth` - Authentication logic
- `@grow/db` - Database access layer
- `@grow/env` - Environment configuration
- `@grow/config` - Shared TypeScript configuration

## File Naming Conventions

- **Module files**: `*.module.ts`
- **Controller files**: `*.controller.ts`
- **Service files**: `*.service.ts`
- **Test files**: `*.spec.ts` or `*.test.ts` (when added)
- **Configuration files**: `*.config.ts`

## Path Aliases

Use `@/*` to reference files from `src/`:
```typescript
import { sendEmail } from '@/lib/email';
```

## Environment Variables

Required environment variables (defined in `.env`):
- `CORS_ORIGIN` - Allowed CORS origins
- `AWS_REGION` - AWS region for SES
- `AWS_ACCESS_KEY_ID` - AWS credentials
- `AWS_SECRET_ACCESS_KEY` - AWS credentials
- `AWS_SES_FROM_EMAIL` - Default sender email address

## Build Artifacts

- **dist/** - Production build output (ESM format)
- **server** - Compiled binary (when using `bun compile`)
- **node_modules/** - Installed dependencies

## Docker Context

The Dockerfile expects to be run from the monorepo root with access to:
- `apps/server/` - This application
- `packages/db/` - Database package
- Workspace lock file (`bun.lock`)
