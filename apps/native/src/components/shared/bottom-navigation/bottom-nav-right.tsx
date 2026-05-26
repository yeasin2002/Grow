import { cn } from "heroui-native";
import { Pressable, type StyleProp, View, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { ACTION_NAVIGATION_ITEMS } from "@/data/nav.data";
import { Icons } from "@/lib";

const softShadow = {
	shadowColor: "#000000",
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.08,
	shadowRadius: 24,
	elevation: 8,
} as const;

interface BottomNavRightProps {
	isActionMenuOpen: boolean;
	actionMenuStyle: StyleProp<ViewStyle>;
	mainActionButtonStyle: StyleProp<ViewStyle>;
	toggleActionMenu: () => void;
	handleActionPress: (
		route: (typeof ACTION_NAVIGATION_ITEMS)[number]["route"],
	) => void;
}

const BottomNavRight = ({
	isActionMenuOpen,
	actionMenuStyle,
	mainActionButtonStyle,
	toggleActionMenu,
	handleActionPress,
}: BottomNavRightProps) => {
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
	const AnimatedView = Animated.createAnimatedComponent(View);
	return (
		<View className="relative ml-auto w-12 items-center self-end">
			<AnimatedView
				className="absolute bottom-14 w-12 rounded-full bg-[#2E2E2E] px-1.5 py-2"
				pointerEvents={isActionMenuOpen ? "auto" : "none"}
				style={[softShadow, actionMenuStyle]}
			>
				{ACTION_NAVIGATION_ITEMS.map((item, index) => (
					<Pressable
						key={item.label}
						className={cn(
							"h-9 items-center justify-center rounded-full",
							index !== ACTION_NAVIGATION_ITEMS.length - 1 && "mb-1.5",
						)}
						onPress={() => handleActionPress(item.route)}
					>
						<Icons className="text-white" name={item.icon} size={20} />
					</Pressable>
				))}
			</AnimatedView>

			<AnimatedPressable
				className="size-12 items-center justify-center rounded-full bg-[#2E2E2E]"
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
	);
};

export default BottomNavRight;
