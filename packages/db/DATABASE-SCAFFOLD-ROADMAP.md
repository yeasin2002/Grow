# Database Scaffold Roadmap

This document explains how to work with the new `@grow/db` scaffold. It is a practical guide for future changes, so you can know which files to touch, which files to avoid, and how the local-first mobile database should grow into cloud sync later.

## Current Goal

The package is now prepared for two different database environments:

- Mobile local database for notes and tasks
- Server cloud database for subscribed-user sync

Mobile local data should not depend on auth. A free or anonymous user can create notes and tasks locally. Auth only matters when that local data is synced to the backend.

The important design rule is:

```text
Mobile owns local work.
Server owns cloud backup and cross-device restore.
Shared domain files define the common language between them.
```

## Package Boundaries

Use these imports intentionally:

```ts
import { noteSchema } from "@grow/db/domain";
```

Use `@grow/db/domain` for shared types, Zod schemas, and repository contracts.

```ts
import { localNotes, localTasks } from "@grow/db/mobile";
```

Use `@grow/db/mobile` inside the Expo app only. This export must stay safe for React Native. It should never import `node-postgres`, server env files, Better Auth server code, or Node-only modules.

```ts
import { db, notes, tasks } from "@grow/db/server";
```

Use `@grow/db/server` inside the NestJS backend, API package, auth package, scripts, and migration tooling.

```ts
import { db } from "@grow/db";
```

The root import still exists for existing server-side code. Do not use it in Expo.

## Folder Meaning

```text
packages/db/src/
  domain/
    note.ts          shared note shape and validation
    task.ts          shared task shape and validation
    sync.ts          shared sync enums and operation shape
    repository.ts    shared repository contracts
    index.ts         shared public exports

  schema/
    postgres/
      notes.ts       server cloud notes table
      tasks.ts       server cloud tasks table
      sync.ts        server sync metadata tables
      index.ts       postgres schema exports

    sqlite/
      notes.ts       mobile local notes table
      tasks.ts       mobile local tasks table
      sync.ts        mobile local sync metadata tables
      index.ts       sqlite schema exports

  mobile/
    index.ts         mobile-safe public exports

  server/
    index.ts         server public exports

  index.ts           existing server Postgres client entry
```

## Why There Are Two Schema Folders

Postgres and SQLite are not the same database. Drizzle also uses different builders for each:

- Postgres uses `drizzle-orm/pg-core`
- SQLite uses `drizzle-orm/sqlite-core`

Because of that, the project should not try to share one physical table definition between server and mobile.

Instead, share the domain model:

```text
domain/note.ts
  -> describes what a Note means

schema/postgres/notes.ts
  -> stores cloud notes for authenticated users

schema/sqlite/notes.ts
  -> stores local notes on the mobile device
```

This avoids duplicate thinking while still respecting each platform.

## Local Mobile Data Rule

Mobile notes and tasks should not require auth fields.

That means SQLite local tables should not have required `userId`.

Reason:

- Free users can use the app without cloud sync.
- Anonymous local data can exist before sign-in.
- A user can subscribe later and upload existing local data.
- The app should not need a backend just to create a local note.

If a future feature needs local account ownership, keep it optional and think carefully before adding it.

## Server Cloud Data Rule

Server-side cloud tables should have `userId`.

Reason:

- Cloud data must be owned by an authenticated user.
- The backend must filter reads by `userId`.
- The backend must reject writes to another user's data.
- Sync endpoints need strong ownership checks.

The client should not send trusted `userId` values. The server should read the user from the authenticated session and apply it internally.

## How To Add A New Entity

Use this process for new local-first entities like `routine`, `habit`, `activity_event`, or `checklist_item`.

### 1. Add The Domain Model

Create:

```text
packages/db/src/domain/routine.ts
```

Define:

- Zod schema for the full entity
- create input schema
- update input schema
- exported TypeScript types
- any enum values

Then export it from:

```text
packages/db/src/domain/index.ts
```

### 2. Add The Mobile SQLite Table

Create:

```text
packages/db/src/schema/sqlite/routines.ts
```

The table should include:

- `id`
- entity fields
- `createdAt`
- `updatedAt`
- `deletedAt`
- `syncStatus`
- `lastSyncedAt`
- `version`
- `deviceId`

Then export it from:

```text
packages/db/src/schema/sqlite/index.ts
```

Do not add required `userId` to local-only mobile tables.

### 3. Add The Server Postgres Table

Create:

```text
packages/db/src/schema/postgres/routines.ts
```

The table should include:

- `id`
- `userId`
- entity fields
- `createdAt`
- `updatedAt`
- `deletedAt`
- `syncStatus`
- `lastSyncedAt`
- `version`
- `deviceId`

Then export it from:

```text
packages/db/src/schema/postgres/index.ts
```

### 4. Update Sync Entity Types

If this entity should sync, update:

```text
packages/db/src/domain/sync.ts
packages/db/src/schema/postgres/sync.ts
packages/db/src/schema/sqlite/sync.ts
```

For example, add `routine` to the sync entity enum in all three places.

This is intentionally manual right now. It makes new synced entity support explicit.

### 5. Add Repository Contract

Update:

```text
packages/db/src/domain/repository.ts
```

Add a repository type for the new entity. This gives mobile and server code a matching interface even though they use different database drivers.

## Required Fields For Syncable Tables

Every syncable entity should follow this shape:

```text
id
createdAt
updatedAt
deletedAt
syncStatus
lastSyncedAt
version
deviceId
```

Server tables also need:

```text
userId
```

Meaning:

- `id`: client-generated ID, stable across local and cloud
- `createdAt`: when the record was created
- `updatedAt`: when the record was last changed
- `deletedAt`: soft-delete marker
- `syncStatus`: local sync state
- `lastSyncedAt`: last confirmed cloud sync time
- `version`: conflict-detection helper
- `deviceId`: which device last created or changed the record
- `userId`: server-side owner for cloud records

## ID Strategy

Use client-generated IDs for notes, tasks, and future syncable entities.

Good choices:

- UUID
- ULID

Do not depend on database-generated numeric IDs for syncable records.

Reason:

- Free users can create data before the server sees it.
- Local records can later be uploaded without changing IDs.
- Relationships like task-to-note stay stable during sync.

## Delete Strategy

Use soft delete for syncable data.

That means:

```text
deletedAt = current date
```

Do not immediately remove the row when the user deletes a note or task.

Reason:

- The delete operation must sync later.
- Other devices need to learn that the record was deleted.
- The server may need tombstones for restore and conflict handling.

Hard delete can happen later as cleanup after data has been synced and the retention window has passed.

## Sync Operation Log

The local mobile database has `sync_operations`.

Every local create, update, or delete should eventually create one operation:

```text
create note
  -> insert notes row
  -> insert sync_operations row

update task
  -> update tasks row
  -> insert sync_operations row

delete note
  -> set notes.deletedAt
  -> insert sync_operations row
```

Free users can still create sync operation rows. The sync worker just does not upload them until the user is subscribed and authenticated.

This makes free-to-paid upgrade much easier.

## Migration Strategy

There are two migration tracks.

### Server Postgres Migrations

Server migrations are generated by Drizzle Kit using:

```bash
pnpm run db:generate
pnpm run db:migrate
```

The Drizzle config points to:

```text
packages/db/src/schema/postgres/index.ts
```

Only server Postgres schema should be included there.

### Mobile SQLite Migrations

Mobile SQLite migrations are not wired yet.

When integration starts, choose one mobile migration approach:

- Drizzle SQLite migrations if the Expo setup supports your chosen driver cleanly
- Manual migration files stored in the native app
- A small migration runner that applies versioned SQL statements

Recommended first version:

```text
apps/native/src/db/migrations/
  0001_initial_local_tables.ts
  0002_add_sync_state.ts
```

Keep mobile migrations separate from server migrations.

## Roadmap To Integration

### Phase 1: Keep Scaffold Stable

Current status:

- Shared domain schemas exist.
- Postgres note/task/sync schemas exist.
- SQLite note/task/sync schemas exist.
- Server/mobile import boundaries exist.

No app code uses this yet.

### Phase 2: Add Mobile DB Client

Add an Expo SQLite client in mobile app code or in `@grow/db/mobile` after driver choice is final.

Possible future file:

```text
packages/db/src/mobile/client.ts
```

Before adding it, confirm which driver you will use:

- `expo-sqlite`
- Drizzle Expo SQLite adapter
- another SQLite driver

Then update:

```text
packages/db/src/mobile/index.ts
```

The mobile client must stay React Native safe.

### Phase 3: Add Mobile Repositories

Create repository implementations for local notes and tasks.

Possible future files:

```text
packages/db/src/mobile/repositories/note-repository.ts
packages/db/src/mobile/repositories/task-repository.ts
```

They should implement:

```ts
NoteRepository
TaskRepository
```

from:

```text
packages/db/src/domain/repository.ts
```

Repository methods should:

- write to local SQLite
- update `updatedAt`
- use soft delete
- set sync status
- write sync operations

### Phase 4: Connect Native Features

Update Expo feature hooks to use repositories.

Example:

```text
apps/native/src/feature/notes/use-notes.ts
apps/native/src/feature/notes/note-actions.ts
```

The screen should not know about SQL or network sync. It should only call actions like:

```text
createNote
updateNote
deleteNote
listNotes
```

### Phase 5: Add Server REST Modules

Create NestJS resource modules.

Possible future files:

```text
apps/server/src/notes/notes.module.ts
apps/server/src/notes/notes.controller.ts
apps/server/src/notes/notes.service.ts
apps/server/src/tasks/tasks.module.ts
apps/server/src/tasks/tasks.controller.ts
apps/server/src/tasks/tasks.service.ts
```

Use Postgres schema exports from:

```text
@grow/db/server
```

Server writes should always derive `userId` from the authenticated session.

### Phase 6: Add Sync Endpoints

Add sync routes later:

```text
POST /sync/push
GET  /sync/pull?cursor=...
POST /sync/bootstrap
```

These should use:

- server `notes`
- server `tasks`
- server `devices`
- server `syncCursors`
- server `syncOperations`

### Phase 7: Add Entitlement Guard

Cloud sync should be allowed only when the backend says the user can sync.

Do not let the mobile app decide this alone.

The mobile app can cache subscription state for UI, but the server must enforce access.

## Safe Change Checklist

Before changing `@grow/db`, ask:

- Is this change shared domain, mobile-only, or server-only?
- Will Expo accidentally import Node-only code?
- Does this entity need sync metadata?
- Does the mobile table avoid required auth fields?
- Does the server table enforce ownership with `userId`?
- Does this require a Postgres migration?
- Does this require a mobile SQLite migration?
- Does this require updating sync entity enums?
- Does this require repository contract changes?

## Verification Commands

Run these after DB package changes:

```bash
pnpm exec tsc -b packages/db/tsconfig.json
pnpm exec oxlint packages/db
```

When migrations are added, also run:

```bash
pnpm run db:generate
```

Only run migration commands when you are ready to create or apply real database migrations.

## Common Mistakes

Avoid these:

- Importing `@grow/db` root from Expo
- Adding `userId` as required in local SQLite note/task tables
- Hard-deleting syncable records immediately
- Using server-generated IDs for local-first records
- Adding a Postgres schema but forgetting the SQLite version
- Adding a SQLite schema but forgetting the domain model
- Adding a new synced entity but forgetting `syncEntityValues`
- Mixing mobile SQLite migrations with server Postgres migrations
- Trusting client subscription state for cloud sync access

## Current Next Best Step

The next implementation step should be mobile-only:

1. Choose and install the SQLite driver.
2. Add a mobile database client.
3. Add local note repository methods.
4. Make note screens read and write local SQLite.
5. Add sync operation writes for each local mutation.

After notes work locally, repeat the same pattern for tasks.

The backend should come after the local-first flow feels solid.

