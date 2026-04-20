import { Text, View } from "react-native";

import { Icons } from "@/lib";

const softShadow = {
	shadowColor: "#000000",
	shadowOffset: { width: 0, height: 10 },
	shadowOpacity: 0.08,
	shadowRadius: 24,
	elevation: 8,
} as const;

export function BottomNavigation() {
	return (
		<View className="mt-auto px-4 pb-4 ">
			<View className="flex-row items-center gap-4">
				<View
					className="flex-1 rounded-full bg-[#F6F6F4] p-1"
					style={softShadow}
				>
					<View className="flex-row items-center">
						<View className="flex-row items-center rounded-full bg-[#2E2E2E] px-5 py-3">
							<Icons className="text-white" name="home" size={16} />
							<Text className="ml-2 text-base font-medium text-white">
								Home
							</Text>
						</View>

						<View className="ml-auto flex-row items-center gap-8 px-4">
							<Icons
								className="text-[#9B9B9B]"
								name="document-text-outline"
								size={18}
							/>
							<Icons
								className="text-[#9B9B9B]"
								name="calendar-outline"
								size={18}
							/>
						</View>
					</View>
				</View>

				<View
					className="size-14 items-center justify-center rounded-full bg-[#2E2E2E]"
					style={softShadow}
				>
					<Icons className="text-white" name="grid" size={20} />
				</View>
			</View>
		</View>
	);
}
