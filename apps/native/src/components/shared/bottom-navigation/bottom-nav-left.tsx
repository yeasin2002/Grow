import { cn } from "heroui-native";
import { Pressable, Text, View } from "react-native";
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	LinearTransition,
} from "react-native-reanimated";
import { NAVIGATION_ITEMS } from "@/data/nav.data";
import { Icons } from "@/lib";

const softShadow = {
	shadowColor: "#000000",
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.08,
	shadowRadius: 24,
	elevation: 8,
} as const;

const activeItemShadow = {
	boxShadow:
		"-2px 4px 5px 0px rgba(181, 181, 181, 0.25) inset, 2px -4px 5px 0px rgba(181, 181, 181, 0.25) inset",
} as const;

const itemTransition = LinearTransition.duration(180).easing(
	Easing.out(Easing.cubic),
);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(Text);

interface BottomNavLeftProps {
	pathname: string;
	handleTabPress: (
		routeName: (typeof NAVIGATION_ITEMS)[number]["tabRouteName"],
	) => void;
}

function isActiveRoute(pathname: string, routes: readonly string[]) {
	return routes.some((route) => pathname === route);
}

const BottomNavLeft = ({ pathname, handleTabPress }: BottomNavLeftProps) => {
	return (
		<View
			className="flex-none flex-row items-center justify-between rounded-full bg-[#F6F6F4] p-1"
			style={softShadow}
		>
			{NAVIGATION_ITEMS.map((item) => {
				const isActive = isActiveRoute(pathname, item.matchRoutes);

				return (
					<AnimatedPressable
						key={item.label}
						layout={itemTransition}
						className={cn(
							"h-12 flex-row items-center justify-center overflow-hidden",
							isActive ? "rounded-full bg-[#2E2E2E] px-4" : "w-12",
						)}
						onPress={() => handleTabPress(item.tabRouteName)}
						style={isActive ? activeItemShadow : undefined}
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
								className="ml-1.5 text-[15px] font-medium text-white"
							>
								{item.label}
							</AnimatedText>
						) : null}
					</AnimatedPressable>
				);
			})}
		</View>
	);
};

export default BottomNavLeft;
