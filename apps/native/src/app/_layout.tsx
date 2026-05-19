import "@/global.css";
import { Stack } from "expo-router";

import { AppThemeProvider } from "@/contexts/app-theme-context";
import "@/global.css";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function StackLayout() {
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
