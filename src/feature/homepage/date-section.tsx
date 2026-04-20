import { Pressable, Text, View } from "react-native";
import { Icons } from "@/lib";

interface DateSectionProps {
	title: string;
	children?: React.ReactNode;
	showAddButton?: boolean;
	onAddPress?: () => void;
}

export function DateSection({
	title,
	children,
	showAddButton = false,
	onAddPress,
}: DateSectionProps) {
	return (
		<View className="mx-0 mb-6  rounded-xl py-2 px-2">
			<View className="flex-row items-center justify-between mb-4">
				<Text className="text-lg font-semibold text-black ">{title}</Text>
				{showAddButton && (
					<Pressable
						className="h-8 w-8 items-center justify-center rounded-full bg-foreground"
						onPress={onAddPress}
					>
						<Icons className="text-background" name="add" size={16} />
					</Pressable>
				)}
			</View>
			<View className="bg-[#F9F9F9] rounded-lg">{children}</View>
		</View>
	);
}
