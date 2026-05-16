import type { CreateNoteInput, Note, UpdateNoteInput } from "./note";
import type { CreateTaskInput, Task, UpdateTaskInput } from "./task";

export type ListNotesOptions = {
  includeDeleted?: boolean;
};

export type ListTasksOptions = {
  includeDeleted?: boolean;
  noteId?: string;
};

export type NoteRepository = {
  create(input: CreateNoteInput): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  list(options?: ListNotesOptions): Promise<Note[]>;
  update(input: UpdateNoteInput): Promise<Note>;
  softDelete(id: string): Promise<void>;
};

export type TaskRepository = {
  create(input: CreateTaskInput): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  list(options?: ListTasksOptions): Promise<Task[]>;
  update(input: UpdateTaskInput): Promise<Task>;
  softDelete(id: string): Promise<void>;
};
