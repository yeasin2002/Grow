import { AppThemeProvider } from "@/contexts/app-theme-context";
import { BottomNavigation } from "@/feature/homepage/bottom-navigation";
import "@/global.css";
import { Stack, usePathname } from "expo-router";
import { HeroUINativeProvider } from "heroui-native";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

export const unstable_settings = {
	initialRouteName: "index",
};

export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<KeyboardProvider>
					<AppThemeProvider>
						<HeroUINativeProvider
							config={{ devInfo: { stylingPrinciples: false } }}
						>
							<StackLayout />
						</HeroUINativeProvider>
					</AppThemeProvider>
				</KeyboardProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

function StackLayout() {
	const pathname = usePathname();
	const insets = useSafeAreaInsets();
	const shouldShowBottomNavigation =
		pathname === "/" ||
		pathname === "/notes" ||
		pathname === "/activity" ||
		pathname === "/calendar";

	return (
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
	);
}
