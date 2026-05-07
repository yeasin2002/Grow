# grow-new

`grow-new` is a TypeScript monorepo built with Better Fullstack. It combines a Next.js web app, a NestJS API, shared packages, and an Expo-based native app.

## Stack

- Next.js 16 and React 19 for the web app
- NestJS for the backend API
- Expo for the native app
- PostgreSQL with Drizzle ORM
- Better Auth for authentication
- TailwindCSS, shadcn/ui, and Tabler Icons for UI
- TanStack Query and TanStack React Form for client state and forms
- Turborepo and pnpm for monorepo orchestration
- Oxlint and Oxfmt for linting and formatting

## Repository Layout

```txt
grow-new/
├── apps/
│   ├── web/      # Next.js frontend on port 3001
│   ├── server/   # NestJS API on port 3000
│   └── native/   # Expo mobile app
├── packages/
│   ├── auth/     # Better Auth configuration and helpers
│   ├── config/   # Shared TypeScript config
│   ├── db/       # Drizzle schema, database client, and Docker setup
│   └── env/      # Shared environment validation
└── README.md
```

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Start PostgreSQL:

```bash
pnpm run db:start
```

3. Configure environment variables:

- `apps/server/.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/grow-new
BETTER_AUTH_SECRET=your-secret-value
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001
LOG_LEVEL=info
```

- `apps/web/.env`

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

4. Push the database schema:

```bash
pnpm run db:push
```

5. Start the development environment:

```bash
pnpm run dev
```

## Local URLs

- Web app: http://localhost:3001
- API: http://localhost:3000

## Useful Scripts

- `pnpm run dev`: Start all apps in development mode
- `pnpm run dev:web`: Start only the web app
- `pnpm run dev:server`: Start only the API
- `pnpm run dev:native`: Start only the native app
- `pnpm run build`: Build all apps
- `pnpm run check-types`: Run TypeScript checks across the workspace
- `pnpm run check`: Run Oxlint and Oxfmt
- `pnpm run db:start`: Start the PostgreSQL container
- `pnpm run db:push`: Push schema changes to the database
- `pnpm run db:generate`: Generate Drizzle migrations
- `pnpm run db:migrate`: Run migrations
- `pnpm run db:studio`: Open Drizzle Studio
- `pnpm run db:stop`: Stop the database container
- `pnpm run db:down`: Remove the database container and network

## Database Workflow

The database package lives in `packages/db`. Its Drizzle config and schema definitions are the source of truth for database changes. A typical local workflow is:

1. Update schema files in `packages/db/src/schema/`
2. Generate or push the schema with Drizzle
3. Use the server and web apps against the same local PostgreSQL instance

## Notes

- The root package manager is `pnpm@10.33.3`
- The repo uses ESM modules throughout
- Shared runtime env validation lives in `packages/env`
