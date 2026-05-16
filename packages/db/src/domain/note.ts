import { z } from "zod";

import { syncStatusSchema } from "./sync";

export const noteKindValues = ["note", "checklist"] as const;

export const noteKindSchema = z.enum(noteKindValues);

export const noteSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(180),
  body: z.string().default(""),
  kind: noteKindSchema.default("note"),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable().optional(),
  syncStatus: syncStatusSchema.default("local"),
  lastSyncedAt: z.coerce.date().nullable().optional(),
  version: z.number().int().min(0).default(0),
  deviceId: z.string().min(1).nullable().optional(),
});

export const createNoteInputSchema = noteSchema
  .pick({
    title: true,
    body: true,
    kind: true,
  })
  .partial({
    body: true,
    kind: true,
  });

export const updateNoteInputSchema = createNoteInputSchema.partial().extend({
  id: z.string().min(1),
});

export type NoteKind = (typeof noteKindValues)[number];

export type Note = z.infer<typeof noteSchema>;

export type CreateNoteInput = z.infer<typeof createNoteInputSchema>;

export type UpdateNoteInput = z.infer<typeof updateNoteInputSchema>;
