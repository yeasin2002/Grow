import { router, type Tabs, usePathname } from "expo-router";
import type { ComponentProps } from "react";
import { useRef, useState } from "react";
import { View } from "react-native";
import {
	Easing,
	interpolate,
	makeMutable,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type {
	ACTION_NAVIGATION_ITEMS,
	NAVIGATION_ITEMS,
} from "@/data/nav.data";

import BottomNavLeft from "./bottom-nav-left";
import BottomNavRight from "./bottom-nav-right";

type BottomNavigationProps =
	NonNullable<ComponentProps<typeof Tabs>["tabBar"]> extends (
		props: infer Props,
	) => React.ReactNode
		? Props
		: never;

export function BottomNavigation({ navigation, state }: BottomNavigationProps) {
	const pathname = usePathname();
	const insets = useSafeAreaInsets();
	const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
	const actionMenuProgress = useRef(makeMutable(0)).current;

	const actionMenuStyle = useAnimatedStyle(() => ({
		opacity: actionMenuProgress.value,
		transform: [
			{
				translateY: interpolate(actionMenuProgress.value, [0, 1], [14, 0]),
			},
			{
				scale: interpolate(actionMenuProgress.value, [0, 1], [0.92, 1]),
			},
		],
	}));

	const mainActionButtonStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: interpolate(actionMenuProgress.value, [0, 1], [1, 0.96]),
			},
		],
	}));

	function toggleActionMenu() {
		const nextValue = !isActionMenuOpen;
		setIsActionMenuOpen(nextValue);
		actionMenuProgress.value = withSpring(nextValue ? 1 : 0, {
			damping: 16,
			stiffness: 220,
			mass: 0.7,
		});
	}

	function handleActionPress(
		route: (typeof ACTION_NAVIGATION_ITEMS)[number]["route"],
	) {
		setIsActionMenuOpen(false);
		actionMenuProgress.value = withTiming(0, {
			duration: 140,
			easing: Easing.out(Easing.cubic),
		});
		router.navigate(route);
	}

	function handleTabPress(
		routeName: (typeof NAVIGATION_ITEMS)[number]["tabRouteName"],
	) {
		const route = state.routes.find((item) => item.name === routeName);

		if (!route) {
			return;
		}

		const event = navigation.emit({
			canPreventDefault: true,
			target: route.key,
			type: "tabPress",
		});

		if (!event.defaultPrevented) {
			navigation.navigate(route.name, route.params);
		}
	}

	return (
		<View
			className="px-3.5"
			style={{ paddingBottom: Math.max(insets.bottom, 14) }}
		>
			<View className="flex-row items-center gap-3.5">
				{/* left side */}
				<BottomNavLeft pathname={pathname} handleTabPress={handleTabPress} />

				{/* right side */}
				<BottomNavRight
					isActionMenuOpen={isActionMenuOpen}
					actionMenuStyle={actionMenuStyle}
					mainActionButtonStyle={mainActionButtonStyle}
					toggleActionMenu={toggleActionMenu}
					handleActionPress={handleActionPress}
				/>
			</View>
		</View>
	);
}
