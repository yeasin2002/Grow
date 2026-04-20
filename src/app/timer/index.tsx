import {
	Pressable,
	ScrollView,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import { Icons } from "@/lib";

const SESSION_PROGRESS = 0.68;
const SESSION_DURATION = "20m";
const TIMER_LABEL = "13:16";

type TimerStatCardProps = {
	label: string;
	value: string;
};

type TimerProgressRingProps = {
	progress: number;
	size: number;
};

export default function TimerScreen() {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const ringSize = Math.min(width - 112, 320);

	return (
		<View className="flex-1 bg-[#f4f4f2]">
			<ScrollView
				bounces={false}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="never"
				contentContainerStyle={{
					flexGrow: 1,
					paddingTop: insets.top + 18,
					paddingBottom: Math.max(insets.bottom + 20, 28),
					paddingHorizontal: 24,
				}}
			>
				<View className="min-h-full justify-between">
					<View>
						<View className="items-center">
							<Text className="text-center text-[24px] font-bold tracking-[-0.6px] text-black">
								English Literature
							</Text>
							<Text className="mt-3 text-center text-[16px] font-medium tracking-[-0.2px] text-[#8f8f8f]">
								11:00 AM - 12:30 AM
							</Text>
						</View>

						<View className="mt-16 items-center">
							<TimerProgressRing progress={SESSION_PROGRESS} size={ringSize} />
						</View>

						<View className="mt-10 flex-row gap-4">
							<TimerStatCard label="Duration" value={SESSION_DURATION} />
							<TimerStatCard label="Progress" value="0%" />
						</View>

						<View className="mt-10 rounded-full bg-[#e7e7e5] p-2.5">
							<View className="flex-row items-center gap-2.5">
								<Pressable className="flex-1 flex-row items-center justify-center rounded-full bg-black px-5 py-4 active:opacity-90">
									<Icons className="mr-2.5 text-white" name="pause" size={18} />
									<Text className="text-[20px] font-medium tracking-[-0.4px] text-white">
										Pause
									</Text>
								</Pressable>

								<Pressable className="flex-1 flex-row items-center justify-center px-5 py-4 active:opacity-80">
									<View className="mr-3 h-4 w-4 rounded-full bg-[#eb0000]" />
									<Text className="text-[20px] font-medium tracking-[-0.4px] text-[#393939]">
										Finish
									</Text>
								</Pressable>
							</View>
						</View>
					</View>

					<View className="mt-14 rounded-[26px] bg-[#ececeb] px-4 pb-4 pt-4">
						<View className="flex-row items-center justify-center">
							<Icons
								className="mr-3 text-[#303030]"
								name="information-circle-outline"
								size={24}
							/>
							<Text className="text-[20px] font-medium tracking-[-0.4px] text-[#353535]">
								Focus Tip
							</Text>
						</View>

						<View className="mt-4 rounded-[20px] bg-white px-5 py-5">
							<Text className="text-center text-[15px] font-medium leading-6 tracking-[-0.2px] text-[#9b9b9b]">
								Minimize distractions, silence notifications
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

function TimerStatCard({ label, value }: TimerStatCardProps) {
	return (
		<View className="flex-1 items-center justify-center rounded-3xl bg-white px-5 py-4">
			<Text className="text-[16px] font-medium text-[#9d9d9b]">{label}</Text>
			<Text className="mt-2 text-[22px] font-bold tracking-[-0.5px] text-[#182033]">
				{value}
			</Text>
		</View>
	);
}

function TimerProgressRing({ progress, size }: TimerProgressRingProps) {
	const strokeWidth = 16;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const dashOffset = circumference * (1 - progress);
	const innerSize = size - 42;

	return (
		<SafeAreaView edges={["top", "bottom"]}>
			<View
				className="items-center justify-center"
				style={{ width: size, height: size }}
			>
				<Svg width={size} height={size}>
					<Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="#dedede"
						strokeWidth={strokeWidth}
						fill="none"
					/>
					<Circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						stroke="#050505"
						strokeWidth={strokeWidth}
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={dashOffset}
						strokeLinecap="round"
						fill="none"
						originX={size / 2}
						originY={size / 2}
						rotation={-90}
					/>
				</Svg>
				<View
					className="absolute items-center justify-center rounded-full border border-[#ededeb] bg-[#f7f7f6]"
					style={{
						width: innerSize,
						height: innerSize,
						borderRadius: innerSize / 2,
					}}
				>
					<Text className="text-[54px] font-bold tracking-[-2px] text-black">
						{TIMER_LABEL}
					</Text>
					<Text className="mt-1.5 text-[18px] font-medium tracking-[-0.3px] text-[#171717]">
						Focus Time
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
