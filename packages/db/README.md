# @grow/db

Database package scaffold for Grow's local-first mobile data and server cloud data.

## Import Boundaries

- Server code can import `@grow/db` or `@grow/db/server`.
- Mobile code should import `@grow/db/mobile`.
- Shared validation and repository contracts can import `@grow/db/domain`.
- Mobile code must not import the root `@grow/db` entry because it creates a Node/Postgres client.

## Current Shape

```text
src/
  domain/            shared note/task/sync schemas and repository contracts
  schema/
    postgres/        server Postgres tables for auth, notes, tasks, sync metadata
    sqlite/          mobile local tables for notes, tasks, sync metadata
  mobile/            mobile-safe exports only
  server/            server-safe exports including the Postgres client
```

Local mobile storage intentionally has no auth dependency. Notes and tasks are local-first records. Server-side tables keep `userId` so the future NestJS REST sync layer can enforce ownership for subscribed users.

