import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

interface TaskItemProps {
	title: string;
	timeRange: string;
	isCompleted?: boolean;
}

export function TaskItem({
	title,
	timeRange,
	isCompleted = false,
}: TaskItemProps) {
	return (
		<View className="flex-row items-center justify-between bg-content1 rounded-xl p-4 mb-3">
			<View className="flex-1">
				<Text
					className={`text-base font-medium ${isCompleted ? "text-default-400 line-through" : "text-foreground"}`}
				>
					{title}
				</Text>
				<Text className="text-sm text-default-400 mt-1">{timeRange}</Text>
			</View>
			<StyledIonicons
				className="text-default-400"
				name="chevron-up"
				size={16}
			/>
		</View>
	);
}
