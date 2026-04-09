import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NotePreview, NotesCard } from "./note-card";
import { NotesHero } from "./notes-hero";
import { NotesSearchRow } from "./notes-search-row";
import { NotesSection } from "./notes-section";

const NOTES_TOTAL = 2;

export function NotesScreen() {
	const insets = useSafeAreaInsets();

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
				<NotesHero noteCount={NOTES_TOTAL} />
				<NotesSearchRow />

				<NotesSection title="Today">
					<NotesCard>
						<NotePreview
							title="Grocery Listing"
							preview="I have to take all of these ..."
							timestamp="Wed 10, 12:00 AM"
							showThumbnail
						/>
					</NotesCard>
				</NotesSection>

				<NotesSection title="Wednesday, 10">
					<NotesCard>
						<NotePreview
							title="Phonetics"
							preview="Phonology is core furnused a..."
							timestamp="Wed 10, 12:00 AM"
						/>

						<View className="my-6 h-px bg-[#e8e8e8]" />

						<NotePreview
							title="Theory"
							preview="Phonology is core furnused a..."
							timestamp="Wed 10, 12:00 AM"
							showThumbnail
						/>
					</NotesCard>
				</NotesSection>
			</ScrollView>
		</View>
	);
}
