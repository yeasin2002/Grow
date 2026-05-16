import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const localNotes = sqliteTable(
  "notes",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    body: text("body").default("").notNull(),
    kind: text("kind", { enum: ["note", "checklist"] }).default("note").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
    deletedAt: integer("deleted_at", { mode: "timestamp_ms" }),
    syncStatus: text("sync_status", {
      enum: ["local", "pending", "syncing", "synced", "failed"],
    })
      .default("local")
      .notNull(),
    lastSyncedAt: integer("last_synced_at", { mode: "timestamp_ms" }),
    version: integer("version").default(0).notNull(),
    deviceId: text("device_id"),
  },
  (table) => [
    index("local_notes_updated_at_idx").on(table.updatedAt),
    index("local_notes_deleted_at_idx").on(table.deletedAt),
    index("local_notes_sync_status_idx").on(table.syncStatus),
  ],
);
