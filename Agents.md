# grow-final

This file provides context about the project for AI assistants.

## Project Overview

- **Ecosystem**: Typescript

## Tech Stack

- **Runtime**: node
- **Package Manager**: pnpm

### Frontend

- Framework: next, native-unistyles
- CSS: tailwind
- UI Library: shadcn-ui

### Backend

- Framework: nestjs
- API: ts-rest
- Validation: zod

### Database

- Database: postgres
- ORM: drizzle

### Authentication

- Provider: better-auth

### Additional Features

- Testing: vitest
- Email: aws-ses

## Project Structure

```
grow-final/
├── apps/
│   ├── web/         # Frontend application
│   ├── native/      # Mobile application (React Native)
│   └── server/      # Backend API
├── packages/
│   ├── api/         # API layer
│   ├── auth/        # Authentication
│   └── db/          # Database schema
```

## Common Commands

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm db:push` - Push database schema
- `pnpm db:studio` - Open database UI

## Maintenance

Keep Agents.md updated when:

- Adding/removing dependencies
- Changing project structure
- Adding new features or services
- Modifying build/dev workflows

AI assistants should suggest updates to this file when they notice relevant changes.
