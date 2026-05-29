import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	NotePreview,
	NotesCard,
	NotesSearchRow,
	NotesSection,
} from "@/components/notes";
import { PageHero } from "@/components/shared/index";

export default function NotesScreen() {
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
				<PageHero title="My Notes" subtitle="2 notes" />
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
