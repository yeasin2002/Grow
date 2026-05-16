import { relations } from "drizzle-orm";
import { index, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "../auth";
import { tasks } from "./tasks";

export const noteKind = pgEnum("note_kind", ["note", "checklist"]);

export const noteSyncStatus = pgEnum("note_sync_status", [
  "local",
  "pending",
  "syncing",
  "synced",
  "failed",
]);

export const notes = pgTable(
  "notes",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    body: text("body").default("").notNull(),
    kind: noteKind("kind").default("note").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    deletedAt: timestamp("deleted_at"),
    syncStatus: noteSyncStatus("sync_status").default("synced").notNull(),
    lastSyncedAt: timestamp("last_synced_at"),
    version: integer("version").default(0).notNull(),
    deviceId: text("device_id"),
  },
  (table) => [
    index("notes_user_id_idx").on(table.userId),
    index("notes_updated_at_idx").on(table.updatedAt),
    index("notes_deleted_at_idx").on(table.deletedAt),
  ],
);

export const notesRelations = relations(notes, ({ one, many }) => ({
  user: one(user, {
    fields: [notes.userId],
    references: [user.id],
  }),
  tasks: many(tasks),
}));
