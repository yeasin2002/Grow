import { router, usePathname } from "expo-router";
import { cn } from "heroui-native";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	interpolate,
	LinearTransition,
	makeMutable,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ACTION_NAVIGATION_ITEMS, NAVIGATION_ITEMS } from "@/data/nav.data";

import { Icons } from "@/lib";

const softShadow = {
	shadowColor: "#000000",
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.08,
	shadowRadius: 24,
	elevation: 8,
} as const;

const itemTransition = LinearTransition.duration(180).easing(
	Easing.out(Easing.cubic),
);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

function isActiveRoute(pathname: string, routes: readonly string[]) {
	return routes.some((route) => pathname === route);
}

export function BottomNavigation() {
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

	return (
		<View
			className="px-4 pt-2"
			style={{ paddingBottom: Math.max(insets.bottom, 16) }}
		>
			<View className="flex-row items-center gap-4">
				<View
					className="flex-1 flex-row items-center justify-between rounded-full bg-[#F6F6F4] p-1.5"
					style={softShadow}
				>
					{NAVIGATION_ITEMS.map((item) => {
						const isActive = isActiveRoute(pathname, item.matchRoutes);

						return (
							<AnimatedPressable
								key={item.label}
								layout={itemTransition}
								className={cn(
									"h-14 flex-row items-center justify-center overflow-hidden",
									isActive ? "rounded-full bg-[#2E2E2E] px-5" : "w-14",
								)}
								onPress={() => router.navigate(item.route)}
								style={isActive ? softShadow : undefined}
							>
								<Icons
									className={isActive ? "text-white" : "text-[#9B9B9B]"}
									name={isActive ? item.activeIcon : item.inactiveIcon}
									size={20}
								/>

								{isActive ? (
									<AnimatedText
										entering={FadeIn.duration(120)}
										exiting={FadeOut.duration(90)}
										className="ml-2 text-[17px] font-medium text-white"
									>
										{item.label}
									</AnimatedText>
								) : null}
							</AnimatedPressable>
						);
					})}
				</View>

				<View className="relative w-14 items-center self-end">
					<AnimatedView
						className="absolute bottom-16 w-14 rounded-full bg-[#2E2E2E] px-2 py-3"
						pointerEvents={isActionMenuOpen ? "auto" : "none"}
						style={[softShadow, actionMenuStyle]}
					>
						{ACTION_NAVIGATION_ITEMS.map((item, index) => (
							<Pressable
								key={item.label}
								className={cn(
									"h-10 items-center justify-center rounded-full",
									index !== ACTION_NAVIGATION_ITEMS.length - 1 && "mb-2",
								)}
								onPress={() => handleActionPress(item.route)}
							>
								<Icons className="text-white" name={item.icon} size={20} />
							</Pressable>
						))}
					</AnimatedView>

					<AnimatedPressable
						className="size-14 items-center justify-center rounded-full bg-[#2E2E2E]"
						onPress={toggleActionMenu}
						style={[softShadow, mainActionButtonStyle]}
					>
						<Icons
							className="text-white"
							name={isActionMenuOpen ? "close" : "grid"}
							size={20}
						/>
					</AnimatedPressable>
				</View>
			</View>
		</View>
	);
}
