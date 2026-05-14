import "@/global.css";
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootWrapper } from "@/components/common";
import { BottomNavigation } from "@/components/shared";

export const unstable_settings = {
	initialRouteName: "index",
};

export default function StackLayout() {
	const pathname = usePathname();
	const insets = useSafeAreaInsets();
	const shouldShowBottomNavigation =
		pathname === "/" ||
		pathname === "/notes" ||
		pathname === "/activity" ||
		pathname === "/calendar";

	return (
		<RootWrapper>
			<View
				className="flex-1 bg-background"
				style={{
					paddingBottom: shouldShowBottomNavigation
						? Math.max(insets.bottom + 88, 112)
						: 0,
				}}
			>
				<Stack
					screenOptions={{
						headerShown: false,
						statusBarStyle: "dark",
						statusBarTranslucent: true,
					}}
				>
					<Stack.Screen name="index" />
				</Stack>
				{shouldShowBottomNavigation ? (
					<View
						pointerEvents="box-none"
						className="absolute bottom-0 left-0 right-0"
					>
						<BottomNavigation />
					</View>
				) : null}
			</View>
		</RootWrapper>
	);
}
