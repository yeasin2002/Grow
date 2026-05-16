import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { localNotes } from "./notes";

export const localTasks = sqliteTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    noteId: text("note_id").references(() => localNotes.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    description: text("description").default("").notNull(),
    status: text("status", {
      enum: ["todo", "in_progress", "done", "cancelled"],
    })
      .default("todo")
      .notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    dueAt: integer("due_at", { mode: "timestamp_ms" }),
    completedAt: integer("completed_at", { mode: "timestamp_ms" }),
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
    index("local_tasks_note_id_idx").on(table.noteId),
    index("local_tasks_status_idx").on(table.status),
    index("local_tasks_updated_at_idx").on(table.updatedAt),
    index("local_tasks_deleted_at_idx").on(table.deletedAt),
    index("local_tasks_sync_status_idx").on(table.syncStatus),
  ],
);
