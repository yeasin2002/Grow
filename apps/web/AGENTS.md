# Product Overview

**grow** is a modern web application built with Next.js that appears to be a development stack or platform. The application features:

- User authentication system with sign-in/sign-up functionality
- Dashboard interface for authenticated users
- Theme switching (light/dark mode) support
- Modern UI components with shadcn/ui design system

The application uses "Better Stack" branding and appears to be focused on providing a better development experience or tooling platform.

## Key Features

- Authentication flow with Better Auth
- Responsive dashboard layout
- Theme management
- Toast notifications
- Modern component library integration

<!-- structure -->

# Project Structure

## Root Directory

```
├── src/                    # Source code
├── .kiro/                  # Kiro configuration and steering
├── .next/                  # Next.js build output
├── node_modules/           # Dependencies
├── package.json            # Project configuration
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── Dockerfile.next         # Docker configuration
└── vercel.json             # Vercel deployment config
```

## Source Structure (`src/`)

### App Router (`src/app/`)

- **App Router pattern** - Next.js 13+ file-based routing
- **layout.tsx** - Root layout with providers and global styles
- **page.tsx** - Home page component
- **Route folders** - Each route has its own directory:
  - `dashboard/` - Dashboard page and components
  - `login/` - Authentication pages

### Components (`src/components/`)

- **UI components** (`ui/`) - Reusable shadcn/ui components
- **Feature components** - Page-specific components (header, forms, etc.)
- **Provider components** - Context providers and wrappers

### Library (`src/lib/`)

- **Utilities** - Helper functions and shared logic
- **Client configurations** - API clients and external service setup
- **Type definitions** - Shared TypeScript types

## Naming Conventions

### Files & Directories

- **kebab-case** for directories (`src/app/dashboard/`)
- **kebab-case** for component files (`sign-in-form.tsx`)
- **camelCase** for utility files (`auth-client.ts`)

### Components

- **PascalCase** for component names
- **Default exports** for page and layout components
- **Named exports** for utility components and functions

### Imports

- **Absolute imports** using `@/` alias for src directory
- **Type imports** using `import type` for TypeScript types
- **Grouped imports** - external packages first, then internal modules

## Architecture Patterns

### Component Organization

- **Atomic design** - UI components in `ui/` folder
- **Feature-based** - Components grouped by functionality
- **Provider pattern** - Centralized context management

### State Management

- **React Query** for server state
- **React Context** for global client state
- **Form state** managed by Tanstack Form

### Styling Approach

- **Utility-first** with Tailwind CSS
- **Component variants** using class-variance-authority
- **CSS variables** for theme customization
- **Responsive design** with mobile-first approach

## File Patterns

### Page Components

```typescript
// src/app/[route]/page.tsx
export default function PageName() {
  return <div>Content</div>;
}
```

### Layout Components

```typescript
// src/app/layout.tsx or src/app/[route]/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

### UI Components

```typescript
// src/components/ui/component-name.tsx
import { cn } from "@/lib/utils";

export function ComponentName({ className, ...props }) {
  return <div className={cn("base-styles", className)} {...props} />;
}
```

<!-- Tech -->

# Technology Stack

## Framework & Runtime

- **Next.js 16.2.4** - React framework with App Router
- **React 19.2.5** - UI library with React Compiler enabled
- **TypeScript 5** - Type-safe JavaScript
- **Node.js** - Runtime environment

## UI & Styling

- **Tailwind CSS 4.2.4** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **@base-ui/react** - Base UI components
- **next-themes** - Theme switching support
- **Framer Motion** - Animation library
- **class-variance-authority** - Component variant management

## Authentication & Data

- **Better Auth** - Authentication solution
- **@tanstack/react-query** - Server state management
- **@tanstack/react-form** - Form handling
- **Zod** - Schema validation

## Development Tools

- **TypeScript** with strict mode enabled
- **React Compiler** - Automatic React optimizations
- **Typed Routes** - Type-safe routing
- **React Query DevTools** - Development debugging

## Build & Deployment

- **Standalone output** - Optimized for containerization
- **Docker** support with Dockerfile.next
- **Vercel** deployment configuration

## Common Commands

```bash
# Development
npm run dev          # Start development server on port 3001

# Production
npm run build        # Build for production
npm run start        # Start production server
```

## Workspace Configuration

- Uses workspace dependencies (`workspace:*`) for internal packages
- Monorepo setup with shared packages (@grow/\*)
- Catalog-based dependency management for consistent versions
