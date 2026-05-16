import { z } from "zod";

import { syncStatusSchema } from "./sync";

export const taskStatusValues = ["todo", "in_progress", "done", "cancelled"] as const;

export const taskStatusSchema = z.enum(taskStatusValues);

export const taskSchema = z.object({
  id: z.string().min(1),
  noteId: z.string().min(1).nullable().optional(),
  title: z.string().trim().min(1).max(180),
  description: z.string().default(""),
  status: taskStatusSchema.default("todo"),
  sortOrder: z.number().int().min(0).default(0),
  dueAt: z.coerce.date().nullable().optional(),
  completedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable().optional(),
  syncStatus: syncStatusSchema.default("local"),
  lastSyncedAt: z.coerce.date().nullable().optional(),
  version: z.number().int().min(0).default(0),
  deviceId: z.string().min(1).nullable().optional(),
});

export const createTaskInputSchema = taskSchema
  .pick({
    noteId: true,
    title: true,
    description: true,
    status: true,
    sortOrder: true,
    dueAt: true,
  })
  .partial({
    noteId: true,
    description: true,
    status: true,
    sortOrder: true,
    dueAt: true,
  });

export const updateTaskInputSchema = createTaskInputSchema.partial().extend({
  id: z.string().min(1),
});

export type TaskStatus = (typeof taskStatusValues)[number];

export type Task = z.infer<typeof taskSchema>;

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;
