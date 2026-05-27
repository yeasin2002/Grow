import { Text, View } from "react-native";
import { ChecklistItem } from "./checklist-item";

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

export const DemoNoteContents = () => {
  return (
    <View>
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
    </View>
  );
};
