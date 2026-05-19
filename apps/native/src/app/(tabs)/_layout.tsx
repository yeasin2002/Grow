import { Tabs } from "expo-router";

import { BottomNavigation } from "@/components/shared";

export const unstable_settings = {
	initialRouteName: "index",
};

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				animation: "fade",
				headerShown: false,
				sceneStyle: {
					backgroundColor: "transparent",
				},
			}}
			tabBar={(props) => <BottomNavigation {...props} />}
		>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="notes/index" />
			<Tabs.Screen name="routine/index" />
			<Tabs.Screen name="activity/index" />
			<Tabs.Screen name="calendar/index" />
		</Tabs>
	);
}
