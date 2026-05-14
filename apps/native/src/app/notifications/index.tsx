import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { notificationSections } from "@/data/notification.data";
import { Icons } from "@/lib";

export default function NotificationsScreen() {
	const insets = useSafeAreaInsets();
	const router = useRouter();

	return (
		<View className="flex-1 bg-white">
			<ScrollView
				className="flex-1"
				contentContainerClassName="px-4 pb-10"
				showsVerticalScrollIndicator={false}
			>
				<View
					className="relative items-center justify-center pb-8"
					style={{ paddingTop: insets.top + 8 }}
				>
					<Pressable
						onPress={() => router.back()}
						className="absolute left-0 bottom-6 h-11 w-11 items-center justify-center rounded-full active:opacity-70"
						accessibilityRole="button"
						accessibilityLabel="Go back"
					>
						<Icons className="text-[#111111]" name="chevron-back" size={24} />
					</Pressable>

					<Text className="text-[22px] font-semibold tracking-[0.2px] text-[#111111]">
						Notification
					</Text>
				</View>

				{notificationSections.map((section) => (
					<View key={section.id} className="mb-6">
						<Text className="mb-4 text-[16px] font-medium text-[#8E8E93]">
							{section.title}
						</Text>

						{section.items.map((item, index) => {
							const isLastItem = index === section.items.length - 1;

							return (
								<View
									key={item.id}
									className={
										!isLastItem ? "border-b border-[#EFEFEF]" : undefined
									}
								>
									<View className="flex-row items-start gap-3 py-5">
										<View className="mt-1 h-12 w-12 items-center justify-center rounded-full bg-[#F4F4F4]">
											<Icons
												className="text-[#111111]"
												name={item.icon}
												size={22}
											/>
										</View>

										<View className="flex-1 pr-2">
											<Text className="text-[17px] leading-7 font-medium text-[#111111]">
												{item.message}
											</Text>
											<Text className="mt-2 text-[14px] text-[#9B9B9B]">
												{item.time}
											</Text>
										</View>

										<Pressable
											className="mt-1 h-8 w-8 items-center justify-center active:opacity-70"
											accessibilityRole="button"
											accessibilityLabel="More options"
										>
											<Icons
												className="text-[#555555]"
												name="ellipsis-vertical"
												size={18}
											/>
										</Pressable>
									</View>
								</View>
							);
						})}
					</View>
				))}
			</ScrollView>
		</View>
	);
}
