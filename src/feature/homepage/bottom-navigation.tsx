import type { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Icons } from "@/lib";

interface NavigationItem {
	id: string;
	label: string;
	icon: keyof typeof Ionicons.glyphMap;
	isActive?: boolean;
}

interface BottomNavigationProps {
	activeTab: string;
	onTabChange: (tabId: string) => void;
}

export function BottomNavigation({
	activeTab,
	onTabChange: _onTabChange,
}: BottomNavigationProps) {
	const navigationItems: NavigationItem[] = [
		{ id: "home", label: "Home", icon: "home", isActive: true },
		{ id: "calendar", label: "", icon: "calendar-outline" },
		{ id: "notes", label: "", icon: "document-text-outline" },
		{ id: "profile", label: "", icon: "person-outline" },
		{ id: "menu", label: "", icon: "grid", isActive: false },
	];

	return (
		<View className="absolute bottom-0 left-0 right-0 bg-background border-t border-default-200">
			<View className="flex-row items-center justify-around py-3 px-6">
				{navigationItems.map((item) => (
					<Pressable
						key={item.id}
						className={`flex-row items-center px-4 py-2 rounded-full ${
							item.id === activeTab || item.isActive
								? "bg-foreground"
								: "bg-transparent"
						}`}
						// onPress={() => onTabChange(item.id)}
						onPress={() =>
							router.push({
								pathname: "/notes/[id]",
								params: { id: "asdf" },
							})
						}
					>
						<Icons
							className={
								item.id === activeTab || item.isActive
									? "text-background"
									: "text-default-400"
							}
							name={item.icon}
							size={20}
						/>
						{item.label && (
							<Text
								className={`ml-2 text-sm font-medium ${
									item.id === activeTab || item.isActive
										? "text-background"
										: "text-default-400"
								}`}
							>
								{item.label}
							</Text>
						)}
					</Pressable>
				))}
			</View>
		</View>
	);
}
