import "@/global.css";
import { Stack } from "expo-router";

import { AppThemeProvider } from "@/contexts/app-theme-context";
import "@/global.css";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

// database config

import { db, expoDb } from "@/lib/drizzle";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Suspense } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import migrations from "../../drizzle/migrations";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};
export const DATABASE_NAME = "grow";

export default function StackLayout() {
	useDrizzleStudio(expoDb);
	const { success, error } = useMigrations(db, migrations);
	console.log("🚀 ~ StackLayout ~ error:", error);
	if (error) {
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		);
	}
	if (!success) {
		return (
			<View>
				<Text>Migration is in progress...</Text>
			</View>
		);
	}

	return (
		<Suspense fallback={<ActivityIndicator size="large" />}>
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
		</Suspense>
	);
}
