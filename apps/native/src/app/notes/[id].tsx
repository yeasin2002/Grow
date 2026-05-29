import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NoteDetailActionBar } from "@/components/note-detail/note-detail-action-bar";
import { NoteDetailHeader } from "@/components/note-detail/note-detail-header";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { INITIAL_DEMO_CONTENT } from "@/data/Initial-demo-content";

function NoteDetailScreen() {
	const insets = useSafeAreaInsets();
	const params = useLocalSearchParams<{ id?: string }>();
	console.log("params", params);
	const title = `Demo Title`;

	const [_noteJson, setNoteJson] = useState<unknown>(INITIAL_DEMO_CONTENT);

	const handleEditorChange = (jsonContent: unknown) => {
		setNoteJson(jsonContent);
		// You can persist this jsonContent to a local SQLite/PostgreSQL DB, async storage, or remote NestJS API
		console.log("Updated Note JSON:", JSON.stringify(jsonContent));
	};

	return (
		<View className="flex-1 bg-[#f7f7f5]">
			{/* Top Header Section */}
			<View className="px-4 z-10" style={{ paddingTop: insets.top + 14 }}>
				<NoteDetailHeader title={title} />
			</View>

			{/* Editor takes up the remaining screen area */}
			<View className="flex-1 px-4 mt-8 pb-32">
				<RichTextEditor
					initialContent={INITIAL_DEMO_CONTENT}
					onChange={handleEditorChange}
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

export default NoteDetailScreen;
