import { Text, View } from "react-native";
import { Icons } from "@/lib";

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
					className={`text-base font-medium ${isCompleted ? "text-black line-through" : "text-black"}`}
				>
					{title}
				</Text>
				<Text className="text-sm text-gray-500 mt-1">{timeRange}</Text>
			</View>
			<Icons
				className="text-default-400 fill-black"
				name="chevron-up"
				size={16}
			/>
		</View>
	);
}
