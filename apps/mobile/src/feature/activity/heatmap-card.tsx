import { Text, View } from "react-native";
import { Icons } from "@/lib";
import { Heatmap } from "./heatmap";

export function HeatmapCard() {
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
