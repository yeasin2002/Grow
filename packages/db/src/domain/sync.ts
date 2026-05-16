import { z } from "zod";

export const syncStatusValues = ["local", "pending", "syncing", "synced", "failed"] as const;

export const syncOperationValues = ["create", "update", "delete"] as const;

export const syncEntityValues = ["note", "task"] as const;

export const syncStatusSchema = z.enum(syncStatusValues);

export const syncOperationSchema = z.enum(syncOperationValues);

export const syncEntitySchema = z.enum(syncEntityValues);

export const syncPayloadSchema = z.record(z.string(), z.unknown());

export const syncOperationRecordSchema = z.object({
  id: z.string().min(1),
  entityType: syncEntitySchema,
  entityId: z.string().min(1),
  operation: syncOperationSchema,
  payload: syncPayloadSchema,
  createdAt: z.coerce.date(),
  attemptCount: z.number().int().min(0).default(0),
  lastAttemptAt: z.coerce.date().nullable().optional(),
  status: syncStatusSchema.default("pending"),
});

export type SyncStatus = (typeof syncStatusValues)[number];

export type SyncOperation = (typeof syncOperationValues)[number];

export type SyncEntity = (typeof syncEntityValues)[number];

export type SyncOperationRecord = z.infer<typeof syncOperationRecordSchema>;
