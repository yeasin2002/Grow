import "@/global.css";
import { Stack } from "expo-router";
import { useEffect } from "react";

import { AppThemeProvider } from "@/contexts/app-theme-context";
import "@/global.css";
import { runMigrations } from "@/lib/drizzle";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function StackLayout() {

	useEffect(() => {
		// initialize local DB migrations on app start
		runMigrations();
	}, []);
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<KeyboardProvider>
					<AppThemeProvider>
						<HeroUINativeProvider
							config={{ devInfo: { stylingPrinciples: false } }}
						>
							<Stack
								screenOptions={{
									headerShown: false,
									statusBarStyle: "dark",
									statusBarTranslucent: true,
								}}
							/>
						</HeroUINativeProvider>
					</AppThemeProvider>
				</KeyboardProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}
