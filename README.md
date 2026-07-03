# Grow

![cover](./cover.jpg)

## What is Grow?

Grow is a modern full-stack application platform that brings together web, mobile, and backend services into one unified ecosystem. Whether you're accessing it from your browser, iPhone, or Android device, Grow provides a seamless experience across all platforms.

### Key Capabilities

- **Multi-Platform Access**: Use Grow on the web through your browser or on your mobile device with native iOS and Android apps
- **Secure Authentication**: Built-in user authentication and authorization to keep your data safe
- **Real-Time Data**: All your information is synchronized across devices in real-time
- **Modern Interface**: Clean, responsive design that works beautifully on any screen size
- **Type-Safe Architecture**: Built with TypeScript to ensure reliability and catch errors before they reach users

## Technology Overview

Grow is built with a modern technology stack designed for performance, scalability, and developer productivity:

### Frontend
- **Web**: Next.js 16 with React 19 for fast, SEO-friendly web applications
- **Mobile**: React Native with Expo for native iOS and Android experiences
- **Styling**: TailwindCSS for consistent, responsive design across platforms
- **UI Components**: shadcn/ui for web, heroui-native for mobile

### Backend
- **API Server**: NestJS with Express for robust, scalable backend services
- **Database**: PostgreSQL with Drizzle ORM for reliable data management
- **Authentication**: Better Auth for secure user authentication
- **Type Safety**: TS-REST for end-to-end type-safe API contracts

### Development Tools
- **Monorepo**: Turborepo for efficient multi-package development
- **Package Manager**: Bun for fast dependency management in monorepos
- **Code Quality**: Oxlint and Oxfmt for consistent code formatting and linting
- **Testing**: Vitest and MSW for comprehensive testing coverage

---

## For Developers

### Getting Started

**Prerequisites**: Node.js 18+, Bun 1.3+, Docker (for PostgreSQL)

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Set up the database**
   ```bash
   # Start PostgreSQL container
   bun run db:start
   
   # Push database schema
   bun run db:push
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` in `apps/server/`
   - Update with your database credentials

4. **Start development servers**
   ```bash
   # Start all applications
   bun run dev
   
   # Or start individually
   bun run dev:web      # Web app on http://localhost:3001
   bun run dev:server   # API server on http://localhost:3000
   bun run dev:native   # Mobile app with Expo
   ```

### Project Structure

```
grow/
├── apps/
│   ├── web/         # Next.js web application
│   ├── native/      # React Native mobile app (Expo)
│   └── server/      # NestJS API server
├── packages/
│   ├── api/         # Shared API contracts (TS-REST)
│   ├── auth/        # Authentication logic (Better Auth)
│   ├── db/          # Database schema & queries (Drizzle)
│   ├── env/         # Environment variable validation
│   └── config/      # Shared configurations
```

### Common Commands

```bash
# Development
bun run dev              # Start all apps
bun run build            # Build all apps
bun run check-types      # Type check all workspaces

# Database
bun run db:studio        # Open Drizzle Studio
bun run db:generate      # Generate migrations
bun run db:migrate       # Run migrations

# Code Quality
bun run check            # Lint and format code
```

### Architecture Highlights

- **Monorepo**: Turborepo manages multiple apps and shared packages efficiently
- **Type Safety**: End-to-end type safety from database to UI using TypeScript, Drizzle, and TS-REST
- **Shared Logic**: Business logic in `@grow/api` is consumed by all applications
- **Workspace Protocol**: Packages reference each other using `workspace:*` for seamless development

---

*This project was bootstrapped with [Better Fullstack](https://github.com/Marve10s/Better-Fullstack)*
