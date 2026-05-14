import { AppThemeProvider } from "@/contexts/app-theme-context";
import "@/global.css";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
	initialRouteName: "index",
};

export const RootWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<KeyboardProvider>
					<AppThemeProvider>
						<HeroUINativeProvider
							config={{ devInfo: { stylingPrinciples: false } }}
						>
							{children}
						</HeroUINativeProvider>
					</AppThemeProvider>
				</KeyboardProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};
