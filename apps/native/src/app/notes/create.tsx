import { router } from "expo-router";
import { useRef, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NoteDetailActionBar } from "@/components/note-detail/note-detail-action-bar";
import { NoteDetailHeader } from "@/components/note-detail/note-detail-header";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { useNotesStore } from "@/store/notes.store";

function NoteCreateScreen() {
	const insets = useSafeAreaInsets();
	const [title, setTitle] = useState("Untitled");
	const contentRef = useRef<unknown>(null);
	const addNote = useNotesStore((s) => s.addNote);
	const savedRef = useRef(false);

	const handleEditorChange = (jsonContent: unknown) => {
		contentRef.current = jsonContent;
	};

	const handleSave = () => {
		if (savedRef.current) return;
		savedRef.current = true;
		addNote(title, contentRef.current);
		router.back();
	};

	return (
		<View className="flex-1 bg-[#f7f7f5]">
			{/* Top Header Section */}
			<View className="px-4 z-10" style={{ paddingTop: insets.top + 14 }}>
				<NoteDetailHeader
					title={title}
					onTitleChange={setTitle}
					onSave={handleSave}
					isCreate
				/>
			</View>

			{/* Editor takes up the remaining screen area */}
			<View className="flex-1 px-4 mt-8 pb-32">
				<RichTextEditor
					initialContent={null}
					onChange={handleEditorChange}
					placeholder="Start writing your note..."
				/>
			</View>

			{/* Bottom Action Bar */}
			<View
				className="absolute bottom-0 left-0 right-0 bg-[#f7f7f5]/95 px-4 pt-4 z-10"
				style={{ paddingBottom: Math.max(insets.bottom, 14) }}
			>
				<NoteDetailActionBar />
			</View>
		</View>
	);
}

export default NoteCreateScreen;
