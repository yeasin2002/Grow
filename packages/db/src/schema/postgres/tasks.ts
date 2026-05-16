import { relations } from "drizzle-orm";
import { index, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "../auth";
import { notes } from "./notes";

export const taskStatus = pgEnum("task_status", [
  "todo",
  "in_progress",
  "done",
  "cancelled",
]);

export const taskSyncStatus = pgEnum("task_sync_status", [
  "local",
  "pending",
  "syncing",
  "synced",
  "failed",
]);

export const tasks = pgTable(
  "tasks",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    noteId: text("note_id").references(() => notes.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    description: text("description").default("").notNull(),
    status: taskStatus("status").default("todo").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    dueAt: timestamp("due_at"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
    syncStatus: taskSyncStatus("sync_status").default("synced").notNull(),
    lastSyncedAt: timestamp("last_synced_at"),
    version: integer("version").default(0).notNull(),
    deviceId: text("device_id"),
  },
  (table) => [
    index("tasks_user_id_idx").on(table.userId),
    index("tasks_note_id_idx").on(table.noteId),
    index("tasks_status_idx").on(table.status),
    index("tasks_updated_at_idx").on(table.updatedAt),
    index("tasks_deleted_at_idx").on(table.deletedAt),
  ],
);

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(user, {
    fields: [tasks.userId],
    references: [user.id],
  }),
  note: one(notes, {
    fields: [tasks.noteId],
    references: [notes.id],
  }),
}));
