import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChecklistItem } from "@/feature/note-detail/checklist-item";
import { NoteDetailActionBar } from "@/feature/note-detail/note-detail-action-bar";
import { NoteDetailHeader } from "@/feature/note-detail/note-detail-header";

const CHECKLIST_ITEMS = [
  { id: "item-1", label: "Onion - 1kg", completed: false },
  { id: "item-2", label: "Carrot - 2 pcs", completed: true },
  { id: "item-3", label: "Onion - 1kg", completed: false },
  { id: "item-4", label: "Carrot - 2 pcs", completed: true },
  { id: "item-5", label: "Carrot - 2 pcs", completed: true },
  { id: "item-6", label: "Onion - 1kg", completed: false },
] as const;

const NOTE_BODY =
  "I have to take all of these things from the market. Also the money need to given to my mon.";

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

        <View className="mt-32">
          {CHECKLIST_ITEMS.map((item) => (
            <ChecklistItem
              key={item.id}
              completed={item.completed}
              label={item.label}
            />
          ))}
        </View>

        <Text className="mt-7 text-[18px] leading-10 tracking-[-0.25px] text-[#151515]">
          {NOTE_BODY}
        </Text>

        <Text className="mt-12 text-right text-[17px] font-medium tracking-[-0.2px] text-[#a5a5a5]">
          - Last edit 3:15pm
        </Text>
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
