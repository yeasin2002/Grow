import { index, integer, jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "../auth";

export const syncEntityType = pgEnum("sync_entity_type", ["note", "task"]);

export const syncOperationType = pgEnum("sync_operation_type", ["create", "update", "delete"]);

export const syncOperationStatus = pgEnum("sync_operation_status", [
  "local",
  "pending",
  "syncing",
  "synced",
  "failed",
]);

export const devices = pgTable(
  "devices",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name"),
    platform: text("platform"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastSeenAt: timestamp("last_seen_at"),
  },
  (table) => [
    index("devices_user_id_idx").on(table.userId),
    index("devices_last_seen_at_idx").on(table.lastSeenAt),
  ],
);

export const syncCursors = pgTable(
  "sync_cursors",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    deviceId: text("device_id").references(() => devices.id, { onDelete: "cascade" }),
    cursor: text("cursor").notNull(),
    lastPulledAt: timestamp("last_pulled_at"),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("sync_cursors_user_id_idx").on(table.userId),
    index("sync_cursors_device_id_idx").on(table.deviceId),
  ],
);

export const syncOperations = pgTable(
  "sync_operations",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    deviceId: text("device_id").references(() => devices.id, { onDelete: "set null" }),
    entityType: syncEntityType("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    operation: syncOperationType("operation").notNull(),
    payload: jsonb("payload").notNull(),
    status: syncOperationStatus("status").default("synced").notNull(),
    attemptCount: integer("attempt_count").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    lastAttemptAt: timestamp("last_attempt_at"),
  },
  (table) => [
    index("sync_operations_user_id_idx").on(table.userId),
    index("sync_operations_entity_idx").on(table.entityType, table.entityId),
    index("sync_operations_status_idx").on(table.status),
  ],
);
