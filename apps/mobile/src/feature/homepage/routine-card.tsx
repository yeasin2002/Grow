import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface RoutineCardProps {
	title: string;
	isExpanded: boolean;
	onToggle: () => void;
	children?: React.ReactNode;
}

export function RoutineCard({
	title,
	isExpanded,
	onToggle,
	children,
}: RoutineCardProps) {
	return (
		<View className="mx-6 mb-4">
			<Pressable
				className="flex-row items-center justify-between py-3"
				onPress={onToggle}
			>
				<View className="flex-row items-center">
					<Ionicons
						className="text-foreground mr-2"
						name={isExpanded ? "chevron-down" : "chevron-forward"}
						size={16}
					/>
					<Text className="text-lg font-semibold text-black">{title}</Text>
				</View>
				<Pressable
					className="flex-row items-center "
					onPress={() => router.push("/timer")}
				>
					<Ionicons
						className="text-black mr-3  rounded-full p-1 border border-[#C5C5C5]"
						name="timer-outline"
						size={20}
					/>
					<Ionicons className="text-danger" name="trash-outline" size={20} />
				</Pressable>
			</Pressable>

			{isExpanded && children && <View className="ml-6">{children}</View>}
		</View>
	);
}
