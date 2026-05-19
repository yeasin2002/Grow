import "@/global.css";
import { Stack } from "expo-router";

import { RootWrapper } from "@/components/common";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function StackLayout() {
	return (
		<RootWrapper>
			<Stack
				screenOptions={{
					headerShown: false,
					statusBarStyle: "dark",
					statusBarTranslucent: true,
				}}
			/>
		</RootWrapper>
	);
}
