import { Pressable, Text, View } from "react-native";
import { Icons } from "@/lib";

export function NotesSearchRow() {
	return (
		<View className="mt-8 flex-row items-center gap-3">
			<View className="flex-1 flex-row items-center rounded-[24px] border border-[#dddddd] bg-transparent px-5 py-4">
				<Text className="flex-1 text-[16px] font-medium tracking-[-0.2px] text-[#a3a3a3]">
					Find any note or documents
				</Text>
				<Icons className="text-[#999999]" name="search-outline" size={26} />
			</View>

			<Pressable className="h-[78px] w-[78px] items-center justify-center rounded-[24px] bg-black active:opacity-90">
				<Icons className="text-white" name="add" size={34} />
			</Pressable>
		</View>
	);
}
