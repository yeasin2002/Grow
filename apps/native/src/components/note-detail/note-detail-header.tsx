import { router } from "expo-router";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Icons } from "@/lib";

type NoteDetailHeaderProps = {
	title: string;
	onTitleChange?: (title: string) => void;
	onDelete?: () => void;
	onSave?: () => void;
	isCreate?: boolean;
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

export function NoteDetailHeader({
	title,
	onTitleChange,
	onDelete,
	onSave,
	isCreate = false,
}: NoteDetailHeaderProps) {
	const handleDelete = () => {
		Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
			{ text: "Cancel", style: "cancel" },
			{ text: "Delete", style: "destructive", onPress: onDelete },
		]);
	};

	const rightAction = isCreate ? (
		<HeaderIconButton icon="checkmark-outline" onPress={onSave} />
	) : (
		<HeaderIconButton
			icon="trash-outline"
			onPress={onDelete ? handleDelete : undefined}
		/>
	);

	return (
		<View className="flex-row items-center justify-between">
			<HeaderIconButton icon="chevron-back" onPress={() => router.back()} />

			<View className="mx-3 flex-1 rounded-full bg-white px-5 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.05)]">
				{onTitleChange ? (
					<TextInput
						value={title}
						onChangeText={onTitleChange}
						className="text-center text-[19px] font-semibold tracking-[-0.3px] text-[#111111]"
						placeholder="Note title"
						placeholderTextColor="#aaaaaa"
						returnKeyType="done"
					/>
				) : (
					<Text
						className="text-center text-[19px] font-semibold tracking-[-0.3px] text-[#111111]"
						numberOfLines={1}
					>
						{title}
					</Text>
				)}
			</View>

			{rightAction}
		</View>
	);
}
