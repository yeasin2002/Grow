import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	NotePreview,
	NotesCard,
	NotesSearchRow,
	NotesSection,
} from "@/components/notes";
import { PageHero } from "@/components/shared/index";
import { extractNotePreview, formatNoteDate } from "@/lib/note-utils";
import { useNotesStore } from "@/store/notes.store";

export default function NotesScreen() {
	const insets = useSafeAreaInsets();
	const notes = useNotesStore((s) => s.notes);

	const handleAddNote = () => {
		router.push("/notes/create");
	};

	return (
		<View className="flex-1 bg-[#f7f7f5]">
			<ScrollView
				bounces={false}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="never"
				contentContainerStyle={{
					paddingTop: insets.top + 18,
					paddingBottom: Math.max(insets.bottom + 24, 32),
					paddingHorizontal: 14,
				}}
			>
				<PageHero
					title="My Notes"
					subtitle={`${notes.length} ${notes.length === 1 ? "note" : "notes"}`}
				/>
				<NotesSearchRow onAdd={handleAddNote} />

				{notes.length === 0 ? (
					<View className="mt-20 items-center">
						<Text className="text-[16px] text-[#aaaaaa] tracking-[-0.2px]">
							No notes yet. Tap + to create one.
						</Text>
					</View>
				) : (
					<NotesSection title="All Notes">
						<NotesCard>
							{notes.map((note, index) => (
								<View key={note.id}>
									{index > 0 && <View className="my-6 h-px bg-[#e8e8e8]" />}
									<NotePreview
										id={note.id}
										title={note.title}
										preview={extractNotePreview(note.content)}
										timestamp={formatNoteDate(note.updatedAt)}
									/>
								</View>
							))}
						</NotesCard>
					</NotesSection>
				)}
			</ScrollView>
		</View>
	);
}
