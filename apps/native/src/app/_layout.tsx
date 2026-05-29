import "@/global.css";
import { Stack } from "expo-router";

import { AppThemeProvider } from "@/contexts/app-theme-context";
import "@/global.css";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { HeroUINativeProvider } from "heroui-native";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { db } from "@/db/client";
import migrations from "../../drizzle/migrations";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function StackLayout() {
	const { success, error } = useMigrations(db, migrations);

	if (!success && !error) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#f7f7f5",
				}}
			>
				<ActivityIndicator size="large" color="#111111" />
			</View>
		);
	}

	if (error) {
		console.error("Database migration failed:", error);
	}

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
