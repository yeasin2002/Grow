# Offline-First Notes, Todos, And Cloud Sync Guide

This guide describes how to build Grow's mobile data feature where free users keep notes, todos, routines, and activity data only on the device, while subscribed users sync the same data to your cloud through a NestJS REST API.

The goal is not to write code yet. The goal is to make the architecture clear enough that implementation becomes a set of small, confident steps.

## Product Rule

Grow should behave like this:

- Free user:
  - Can create, edit, delete, and read data on the phone.
  - Data is stored locally.
  - Data does not sync to the backend.
  - If the app is deleted, local data is lost.
  - Reinstalling the app starts fresh unless the user later had cloud sync.

- Subscribed user:
  - Can create, edit, delete, and read data on the phone.
  - Data is still stored locally first so the app works fast and offline.
  - Local changes are uploaded to the backend.
  - Cloud data can be restored after reinstall or on another device.
  - The backend becomes the durable source of truth, but the mobile local database remains the working cache.

The most important mental model: every user uses the same app features, but only subscribed users get sync and restore.

## Recommended Architecture

Use an offline-first architecture with two data layers:

1. Local database on mobile
2. Cloud database on the server

The mobile app should always read from the local database for notes, todos, routines, and activity. The difference between free and subscribed mode is whether the app runs sync jobs.

That means UI components do not need to care much about free vs subscribed mode. A note editor should save to the local repository. A background sync layer decides whether that local change should also be pushed to the server.

```text
React Native screen
  -> feature hook
    -> local repository
      -> Expo SQLite / local Drizzle database
      -> local operation log
        -> sync engine, only enabled for subscribed users
          -> NestJS REST API
            -> Postgres / Drizzle server database
```

## Do Not Use TS-REST For This Feature

For this feature, keep the backend API as normal NestJS REST.

That means:

- Controllers expose REST endpoints such as `GET /notes`, `POST /notes`, `PATCH /notes/:id`, and `DELETE /notes/:id`.
- DTOs are validated with Zod, class-validator, or whichever validation approach you choose consistently.
- The mobile app calls the API through a small REST client wrapper.
- TanStack Query can still be used for server requests if useful, but local data should not depend on network requests.

TS-REST can stay in the repo for older/generated areas, but this feature should be designed independently from it.

## Reusing The DB Package

You want to reuse the existing `@grow/db` package for both the NestJS server and Expo local storage. That is a good instinct, but there is one important constraint:

The current `@grow/db` entry imports `node-postgres` and server environment variables. Expo cannot safely import that. Also, Postgres Drizzle schemas use `pg-core`, while local mobile storage should usually use SQLite through `expo-sqlite` or another React Native SQLite driver.

So the best approach is not "one exact database client for server and mobile." The best approach is:

- One shared domain model
- One shared set of entity names and field meanings
- One shared repository contract
- Two database adapters:
  - Postgres adapter for server
  - SQLite adapter for mobile

Recommended package shape:

```text
packages/db/
  src/
    domain/
      note-models.ts
      task-models.ts
      sync-models.ts
    schema/
      postgres/
        notes.ts
        tasks.ts
        sync.ts
      sqlite/
        notes.ts
        tasks.ts
        sync.ts
    server/
      client.ts
      repositories/
    mobile/
      client.ts
      repositories/
```

The important rule: mobile imports must never touch server-only files.

For example:

- Server can import `@grow/db/server`.
- Mobile can import `@grow/db/mobile`.
- Both can import `@grow/db/domain`.

This lets you avoid writing business decisions twice while still respecting that Postgres and SQLite are different databases.

## Local Storage Choice

For Expo, use a real local database, not AsyncStorage, for notes and todos.

Good options:

- `expo-sqlite` with Drizzle's SQLite support
- `react-native-quick-sqlite` if you later need more performance
- WatermelonDB if the app becomes heavily sync-oriented, though it adds more framework weight

For Grow, start with `expo-sqlite` plus Drizzle SQLite. It fits the stack you already like and keeps the local database understandable.

AsyncStorage or SecureStore should only hold small values like:

- auth tokens
- onboarding flags
- selected theme
- last sync timestamp
- cached subscription status

Do not store the main notes/todos dataset there.

## Core Data Model

Every syncable table should have fields that make local-first sync possible.

For notes, todos, routines, and similar user data, use fields like:

```text
id
userId
title
content
createdAt
updatedAt
deletedAt
syncStatus
lastSyncedAt
version
deviceId
```

Use client-generated IDs, preferably UUID or ULID. This is important because free users can create data before the server ever sees it. If the user subscribes later, the app can upload the same records without replacing all local IDs.

Soft delete is strongly recommended. Instead of immediately removing a row, set `deletedAt`. The sync engine can then tell the server that the record was deleted.

## Local Tables

The mobile local database should contain normal app tables plus sync metadata.

Recommended mobile tables:

- `notes`
- `todos`
- `routines`
- `tasks`
- `activity_events`
- `sync_operations`
- `sync_state`
- `device_state`

The `sync_operations` table is the most important part of the design. Whenever the user creates, edits, or deletes something locally, you also write an operation.

Example operation concepts:

```text
id
entityType: note | todo | routine | task
entityId
operation: create | update | delete
payload
createdAt
attemptCount
lastAttemptAt
status: pending | syncing | failed | synced
```

Free users can still write to this table, but the sync worker simply does not run. That makes future upgrades easier. When the user subscribes, pending operations can start uploading.

## Server Tables

The Postgres server should store the durable version of subscribed users' data.

Recommended server tables:

- `notes`
- `todos`
- `routines`
- `tasks`
- `activity_events`
- `devices`
- `sync_cursors`
- `subscriptions` or `entitlements`

The backend should always verify that the authenticated user owns the data they are trying to access.

Do not trust the mobile app to say "I am subscribed." The server should check subscription entitlement before allowing sync endpoints.

## Subscription And Entitlement Model

Create a small concept called an entitlement.

The mobile app can display subscription state, but the backend should decide the truth.

Example states:

- `free`
- `trial`
- `active`
- `past_due`
- `cancelled`

For sync, the only question is:

```text
canSync = entitlement is trial or active
```

On app start, the mobile app should fetch the current entitlement if the user is logged in. Cache it locally for UI decisions, but treat the server as final.

## API Design

Use REST endpoints that are simple and sync-friendly.

Basic resource endpoints:

```text
GET    /notes
POST   /notes
GET    /notes/:id
PATCH  /notes/:id
DELETE /notes/:id
```

Sync endpoints:

```text
POST /sync/push
GET  /sync/pull?cursor=...
POST /sync/bootstrap
```

Recommended meaning:

- `POST /sync/push`: mobile sends pending local operations.
- `GET /sync/pull`: mobile asks for server changes since its last cursor.
- `POST /sync/bootstrap`: first cloud restore after login or reinstall.

For the first version, you can skip a very fancy sync protocol and still be safe:

- Push local changes.
- Pull server changes.
- Use `updatedAt`, `deletedAt`, and `version` to resolve conflicts.
- Store the last successful sync cursor.

## Conflict Strategy

Start simple.

Recommended version 1 conflict rule:

- If only local changed, push local.
- If only server changed, pull server.
- If both changed, latest `updatedAt` wins.
- Keep deleted records as tombstones for a period so deletes can sync across devices.

Later, notes can get a better merge strategy if needed. For example, checklist items can merge item-by-item instead of replacing the whole note.

Do not build advanced conflict resolution before the basic sync is working.

## Free To Paid Upgrade Flow

This is a key user journey.

When a free user subscribes:

1. User signs in or creates an account.
2. Server confirms subscription entitlement.
3. Mobile app enables sync.
4. Mobile app uploads all unsynced local data.
5. Server creates cloud records using the existing client-generated IDs.
6. Mobile app pulls any existing server data.
7. App marks local records as synced.

Important UX note: tell the user that local data is being backed up. Do not block them from using the app unless there is a serious migration issue.

## Paid To Free Downgrade Flow

When a subscription expires:

1. App keeps local data on the device.
2. App stops pushing local changes to the cloud.
3. App can still read already-local data.
4. Backend can stop accepting sync writes.
5. Decide product policy for cloud data retention.

Possible policies:

- Keep cloud data read-only for a grace period.
- Keep cloud data but stop new sync.
- Delete cloud data after a clear retention window.

Do not silently delete cloud data immediately. Users should understand the policy.

## Reinstall Behavior

Free user reinstall:

- Local database is gone.
- No cloud restore is available.
- User starts fresh.

Subscribed user reinstall:

- User signs in.
- Mobile app checks entitlement.
- App calls bootstrap/pull endpoint.
- Server returns cloud data.
- Mobile app rebuilds local database.

This is why the mobile app should always be able to hydrate local SQLite from cloud data.

## Feature Layer Pattern

For each feature, keep the screen simple.

Recommended structure:

```text
src/feature/notes/
  note-card.tsx
  notes-section.tsx
  use-notes.ts
  note-actions.ts
```

The hook should talk to a repository, not directly to fetch or raw SQL.

Example mental model:

```text
createNote(input)
  -> write note to local DB
  -> write pending sync operation
  -> update UI from local DB
```

The screen does not need to know whether the operation goes to the cloud today, later, or never.

## Sync Engine Responsibilities

The sync engine should be a separate service inside the mobile app.

It should:

- Check whether the user is authenticated.
- Check whether the user can sync.
- Check network availability.
- Push pending local operations.
- Pull remote changes.
- Retry failed operations.
- Avoid running multiple sync jobs at the same time.
- Save sync state locally.

Sync can run:

- on app start
- after login
- after subscription activation
- when app returns to foreground
- after a local mutation
- manually from settings

Do not make every note save wait for the server. Save locally first, then sync.

## Authentication

Use Better Auth for identity.

For mobile:

- Keep auth token/session handling in the existing auth client layer.
- Attach auth credentials to REST requests.
- If unauthenticated, keep data local only.
- When the user signs in, decide whether to link current local data to that account.

Important product question:

If an anonymous free user creates notes, then signs into an existing paid account, should local notes merge into that account or stay separate?

Recommended first version: ask before merging local data into an existing cloud account.

## Data Ownership

Every cloud record should belong to a user.

Server write rules:

- `userId` comes from the authenticated session.
- The client must not be allowed to write arbitrary `userId`.
- The server filters all reads by authenticated `userId`.
- Deletes should only affect records owned by that user.

Mobile local data can store `userId` as nullable:

- `null` for anonymous local-only data
- authenticated user ID after sign-in or merge

## Implementation Roadmap

Build this in phases.

### Phase 1: Local-Only Foundation

Goal: make free mode excellent first.

Tasks:

- Add mobile SQLite setup.
- Add local schemas for notes and todos.
- Add repository functions for create/read/update/delete.
- Make notes and todos screens read from local database.
- Add soft delete.
- Add client-generated IDs.

At the end of this phase, the app works fully without a backend.

### Phase 2: Shared Domain Package

Goal: avoid duplicating business rules.

Tasks:

- Split `@grow/db` so mobile can import safe subpaths.
- Move shared types and validation schemas into `@grow/db/domain` or a separate shared package.
- Keep Postgres code server-only.
- Keep SQLite code mobile-only.
- Define repository contracts that both adapters follow.

At the end of this phase, server and mobile share the same entity language even though they use different database drivers.

### Phase 3: NestJS REST Resources

Goal: create normal cloud CRUD.

Tasks:

- Add NestJS modules for notes and todos.
- Add REST controllers.
- Add DTO validation.
- Add ownership checks.
- Add Postgres tables through Drizzle.
- Add service-level tests for ownership and CRUD behavior.

At the end of this phase, subscribed users can store data in Postgres through REST.

### Phase 4: Entitlements

Goal: decide who can sync.

Tasks:

- Add an entitlement/subscription model.
- Add backend guard or service check for sync endpoints.
- Add mobile entitlement fetch.
- Cache entitlement locally for UI.
- Add settings UI that explains backup status.

At the end of this phase, the backend can enforce cloud sync access.

### Phase 5: Operation Log

Goal: prepare local changes for sync.

Tasks:

- Add `sync_operations` table locally.
- On every local create/update/delete, write a pending operation.
- Add operation retry fields.
- Add local sync status fields.

At the end of this phase, local changes are durable and ready to upload.

### Phase 6: Push Sync

Goal: upload local changes to cloud.

Tasks:

- Add `POST /sync/push`.
- Mobile sends pending operations.
- Server validates entitlement and ownership.
- Server applies operations idempotently.
- Mobile marks operations as synced after success.

At the end of this phase, paid users' local changes reach the cloud.

### Phase 7: Pull Sync And Restore

Goal: restore cloud data after reinstall and support multiple devices.

Tasks:

- Add server change tracking.
- Add `GET /sync/pull`.
- Add sync cursor storage.
- Add bootstrap restore flow.
- Apply remote changes into local SQLite.

At the end of this phase, subscribed users can reinstall and recover data.

### Phase 8: Conflict Handling

Goal: make multi-device edits predictable.

Tasks:

- Add row versioning.
- Add conflict detection.
- Start with latest update wins.
- Add tombstone cleanup policy.
- Add tests for update/update and update/delete conflicts.

At the end of this phase, sync behavior is understandable and stable.

## Testing Strategy

Test the architecture at three levels.

Local mobile tests:

- creating a note writes to local DB
- updating a note changes `updatedAt`
- deleting a note sets `deletedAt`
- each mutation creates a sync operation

Server tests:

- user cannot read another user's data
- free user cannot call sync endpoints
- active subscribed user can push changes
- duplicate push does not create duplicate records

End-to-end scenarios:

- free user creates data, deletes app, data is gone
- free user subscribes, existing local data uploads
- subscribed user reinstalls and restores cloud data
- two devices edit the same note and conflict rule is applied

## Common Mistakes To Avoid

- Do not make the mobile UI depend directly on API calls for core data.
- Do not use AsyncStorage for notes and todos.
- Do not let Expo import server-only `node-postgres` code.
- Do not use server-generated IDs only.
- Do not hard-delete immediately when sync exists.
- Do not trust client-side subscription state.
- Do not build complex conflict resolution before basic push/pull sync works.

## Best First Technical Decision

Start by making the mobile app local-first.

For your current repo, the first real implementation step should be:

1. Add a mobile-safe local database layer.
2. Refactor `@grow/db` exports so mobile can import only mobile-safe files.
3. Make notes save locally through a repository.
4. Add sync metadata even before the backend sync exists.

Once that is working, the cloud feature becomes an upgrade to the data layer instead of a rewrite of the app.

