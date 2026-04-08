import { Pressable, Text, View } from "react-native";

interface TaskFilterTabsProps {
	activeTab: "todo" | "completed" | "pending";
	onTabChange: (tab: "todo" | "completed" | "pending") => void;
}

export function TaskFilterTabs({
	activeTab,
	onTabChange,
}: TaskFilterTabsProps) {
	const tabs = [
		{ id: "todo" as const, label: "To do", icon: "⚡" },
		{ id: "completed" as const, label: "Completed", icon: "✓" },
		{ id: "pending" as const, label: "Pending", icon: "⏰" },
	];

	return (
		<View className="flex-row mx-6 mb-4">
			{tabs.map((tab) => (
				<Pressable
					key={tab.id}
					className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
						activeTab === tab.id ? "bg-foreground" : "bg-transparent"
					}`}
					onPress={() => onTabChange(tab.id)}
				>
					<Text className="mr-1">{tab.icon}</Text>
					<Text
						className={`text-sm font-medium ${
							activeTab === tab.id ? "text-background" : "text-default-500"
						}`}
					>
						{tab.label}
					</Text>
				</Pressable>
			))}
		</View>
	);
}
