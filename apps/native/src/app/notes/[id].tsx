import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DemoNoteContents } from "@/feature/note-detail";
import { NoteDetailActionBar } from "@/feature/note-detail/note-detail-action-bar";
import { NoteDetailHeader } from "@/feature/note-detail/note-detail-header";

function NoteDetailScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id?: string }>();
  const title =
    typeof params.id === "string" ? params.id : "Grocery Listing...";

  return (
    <View className="flex-1 bg-[#f7f7f5]">
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingTop: insets.top + 14,
          paddingBottom: insets.bottom + 148,
          paddingHorizontal: 16,
        }}
      >
        <NoteDetailHeader title={title} />
        <DemoNoteContents />
      </ScrollView>

      <View
        className="absolute bottom-0 left-0 right-0 bg-[#f7f7f5]/95 px-4 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 14) }}
      >
        <NoteDetailActionBar />
      </View>
    </View>
  );
}

export default NoteDetailScreen;
