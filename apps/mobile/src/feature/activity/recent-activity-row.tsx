import { Text, View } from "react-native";

type RecentActivityRowProps = {
	title: string;
	progressText: string;
	progress: string;
	progressColor: string;
	status: string;
	statusColor: string;
	isLast?: boolean;
};

export function RecentActivityRow({
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
