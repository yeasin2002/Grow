import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { secureStoreZustandStorage } from "@/lib/mmkv";

export type Note = {
	id: string;
	title: string;
	content: unknown; // Tiptap JSON doc
	createdAt: number;
	updatedAt: number;
};

type NotesStore = {
	notes: Note[];
	addNote: (title: string, content: unknown) => Note;
	updateNote: (
		id: string,
		patch: Partial<Pick<Note, "title" | "content">>,
	) => void;
	deleteNote: (id: string) => void;
	getNoteById: (id: string) => Note | undefined;
};

export const useNotesStore = create<NotesStore>()(
	persist(
		(set, get) => ({
			notes: [],

			addNote: (title, content) => {
				const note: Note = {
					id: `note-${Date.now()}`,
					title: title.trim() || "Untitled",
					content,
					createdAt: Date.now(),
					updatedAt: Date.now(),
				};
				set((state) => ({ notes: [note, ...state.notes] }));
				return note;
			},

			updateNote: (id, patch) => {
				set((state) => ({
					notes: state.notes.map((n) =>
						n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n,
					),
				}));
			},

			deleteNote: (id) => {
				set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }));
			},

			getNoteById: (id) => {
				return get().notes.find((n) => n.id === id);
			},
		}),
		{
			name: "notes-storage",
			storage: createJSONStorage(() => secureStoreZustandStorage),
		},
	),
);
