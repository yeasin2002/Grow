import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icons } from "@/lib";
import { Heatmap } from "./heatmap";

const RECENT_ACTIVITY = [
	{
		title: "Today",
		progressText: "4 / 4",
		progress: "w-full",
		progressColor: "bg-black",
		status: "Completed",
		statusColor: "text-[#72d3a6]",
	},
	{
		title: "Thursday, Mar 26",
		progressText: "1 / 4",
		progress: "w-1/4",
		progressColor: "bg-[#8f8f8f]",
		status: "Goal not met",
		statusColor: "text-[#a6a6a6]",
	},
	{
		title: "Friday, Mar 27",
		progressText: "2 / 4",
		progress: "w-2/5",
		progressColor: "bg-[#9a9a9a]",
		status: "Goal not met",
		statusColor: "text-[#a6a6a6]",
	},
] as const;

function HeatmapCard() {
	return (
		<View className="rounded-[26px] bg-white px-4 pb-4 pt-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
			<View className="flex-row items-start">
				<View className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#fafafa]">
					<Icons className="text-[#d7d7d7]" name="sparkles-outline" size={22} />
				</View>

				<View className="flex-1">
					<Text className="text-[17px] font-semibold tracking-[-0.3px] text-[#171717]">
						Activity Heat map
					</Text>
					<Text className="mt-1 text-[14px] font-medium text-[#979797]">
						Your study consistency shows here
					</Text>
				</View>
			</View>

			<View className="mt-8">
				<Heatmap />
			</View>
		</View>
	);
}

type RecentActivityRowProps = {
	title: string;
	progressText: string;
	progress: string;
	progressColor: string;
	status: string;
	statusColor: string;
	isLast?: boolean;
};

function RecentActivityRow({
	title,
	progressText,
	progress,
	progressColor,
	status,
	statusColor,
	isLast = false,
}: RecentActivityRowProps) {
	return (
		<View className={isLast ? "" : "border-b border-[#ededed] pb-6"}>
			<View className="flex-row items-center justify-between">
				<Text className="text-[16px] font-semibold tracking-[-0.24px] text-[#181818]">
					{title}
				</Text>
				<Text className="text-[16px] font-medium text-[#7e7e7e]">
					{progressText}
				</Text>
			</View>

			<View className="mt-3 h-3 rounded-full bg-[#ececec]">
				<View className={`h-3 rounded-full ${progressColor} ${progress}`} />
			</View>

			<Text className={`mt-2 text-[13px] font-medium ${statusColor}`}>
				{status}
			</Text>
		</View>
	);
}

function RecentActivityCard() {
	return (
		<View className="rounded-[26px] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
			<View className="gap-6">
				{RECENT_ACTIVITY.map((item, index) => (
					<RecentActivityRow
						key={item.title}
						title={item.title}
						progressText={item.progressText}
						progress={item.progress}
						progressColor={item.progressColor}
						status={item.status}
						statusColor={item.statusColor}
						isLast={index === RECENT_ACTIVITY.length - 1}
					/>
				))}
			</View>
		</View>
	);
}

export function ActivityScreen() {
	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-[#f7f7f5]">
			<ScrollView
				bounces={false}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="never"
				contentContainerStyle={{
					paddingTop: insets.top + 14,
					paddingBottom: Math.max(insets.bottom + 28, 36),
					paddingHorizontal: 16,
				}}
			>
				<Text className="text-[20px] font-bold tracking-[-0.4px] text-[#111111]">
					Study Time Tracker
				</Text>

				<View className="mt-7">
					<HeatmapCard />
				</View>

				<View className="mt-10 flex-row items-center justify-between">
					<Text className="text-[18px] font-bold tracking-[-0.36px] text-[#161616]">
						Recent Activity
					</Text>
					<View className="rounded-full bg-[#f1efec] px-4 py-2">
						<Text className="text-[14px] font-medium text-[#b1adaa]">
							Last 10 days
						</Text>
					</View>
				</View>

				<View className="mt-5">
					<RecentActivityCard />
				</View>
			</ScrollView>
		</View>
	);
}
