import { Icons } from "@/lib";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type NoteDetailHeaderProps = {
  title: string;
};

function HeaderIconButton({
  icon,
  onPress,
}: {
  icon: React.ComponentProps<typeof Icons>["name"];
  onPress?: () => void;
}) {
  return (
    <Pressable
      className="h-12.5 w-19 items-center justify-center rounded-3xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] active:opacity-90"
      onPress={onPress}
    >
      <Icons className="text-[#969696]" name={icon} size={32} />
    </Pressable>
  );
}

export function NoteDetailHeader({ title }: NoteDetailHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <HeaderIconButton icon="chevron-back" onPress={() => router.back()} />

      <View className="mx-3 flex-1 rounded-full bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)]">
        <Text
          className="text-center text-[19px] font-semibold tracking-[-0.3px] text-[#111111]"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      <HeaderIconButton icon="arrow-undo-outline" />
    </View>
  );
}
