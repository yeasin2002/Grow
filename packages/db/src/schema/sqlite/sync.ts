import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const localSyncOperations = sqliteTable(
  "sync_operations",
  {
    id: text("id").primaryKey(),
    entityType: text("entity_type", { enum: ["note", "task"] }).notNull(),
    entityId: text("entity_id").notNull(),
    operation: text("operation", { enum: ["create", "update", "delete"] }).notNull(),
    payload: text("payload", { mode: "json" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    attemptCount: integer("attempt_count").default(0).notNull(),
    lastAttemptAt: integer("last_attempt_at", { mode: "timestamp_ms" }),
    status: text("status", {
      enum: ["local", "pending", "syncing", "synced", "failed"],
    })
      .default("pending")
      .notNull(),
  },
  (table) => [
    index("local_sync_operations_entity_idx").on(table.entityType, table.entityId),
    index("local_sync_operations_status_idx").on(table.status),
    index("local_sync_operations_created_at_idx").on(table.createdAt),
  ],
);

export const localSyncState = sqliteTable("sync_state", {
  id: text("id").primaryKey(),
  cursor: text("cursor"),
  lastPulledAt: integer("last_pulled_at", { mode: "timestamp_ms" }),
  lastPushedAt: integer("last_pushed_at", { mode: "timestamp_ms" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const localDeviceState = sqliteTable("device_state", {
  id: text("id").primaryKey(),
  deviceId: text("device_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  lastSeenAt: integer("last_seen_at", { mode: "timestamp_ms" }),
});
