import { Image, Text, View } from "react-native";
import taskImage from "@/assets/task-image.jpg";

type NotePreviewProps = {
  title: string;
  preview: string;
  timestamp: string;
  showThumbnail?: boolean;
};

export function NotePreview({
  title,
  preview,
  timestamp,
  showThumbnail = false,
}: NotePreviewProps) {
  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-1">
        <Text className="text-[18px] font-bold tracking-[-0.5px] text-[#111111]">{title}</Text>
        <Text className="mt-3 text-[14px] font-medium tracking-[-0.2px] text-[#1c1c1c]">
          {preview}
        </Text>
        <Text className="mt-2 text-[13px] font-medium tracking-[-0.1px] text-[#8f8f8f]">
          {timestamp}
        </Text>
      </View>

      {showThumbnail ? (
        <Image source={taskImage} className="size-20 rounded-[18px] bg-[#d4d4d4]" />
      ) : null}
    </View>
  );
}

type NotesCardProps = {
  children: React.ReactNode;
};

export function NotesCard({ children }: NotesCardProps) {
  return (
    <View className="rounded-[26px] bg-white px-5 py-6 shadow-[0_16px_34px_rgba(0,0,0,0.08)]">
      {children}
    </View>
  );
}
