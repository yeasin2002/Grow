import { Text, View } from "react-native";

interface ProgressSectionProps {
	title: string;
	subtitle: string;
	completed: number;
	total: number;
}

export function ProgressSection({
	title,
	subtitle,
	completed,
	total,
}: ProgressSectionProps) {
	const progressPercentage = (completed / total) * 100;

	return (
		<View className="mx-6 mb-6 rounded-2xl bg-content1 p-4">
			<Text className="text-lg font-semibold text-foreground mb-1">
				{title}
			</Text>
			<View className="flex-row items-center mb-3">
				<View className="h-2 w-2 rounded-full bg-success mr-2" />
				<Text className="text-sm text-success">{subtitle}</Text>
			</View>

			<View className="mb-3">
				<View className="flex-row items-center justify-between mb-2">
					<Text className="text-sm text-default-500">Routines completed</Text>
					<Text className="text-sm font-medium text-foreground">
						{completed} / {total}
					</Text>
				</View>
				<View className="h-2 rounded-full bg-default-200">
					<View
						className="h-2 rounded-full bg-success"
						style={{ width: `${progressPercentage}%` }}
					/>
				</View>
			</View>
		</View>
	);
}
