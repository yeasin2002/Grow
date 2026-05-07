import { Text, View } from "react-native";

type NotesSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function NotesSection({ title, children }: NotesSectionProps) {
  return (
    <View className="mt-10">
      <Text className="text-[24px] font-bold tracking-[-0.7px] text-black">{title}</Text>
      <View className="mt-5">{children}</View>
    </View>
  );
}
