import { Input } from "heroui-native";
import { Pressable, View } from "react-native";
import { Icons } from "@/lib";

export function NotesSearchRow() {
	return (
		<View className="mt-8 flex-row items-center gap-2">
			<Input
				placeholder="Find any note or documents"
				className="flex-1 flex-row items-center rounded-2xl border border-[#dddddd] bg-transparent py-4! min-h-5 pl-2"
			/>
			<Pressable className="w-12 h-12 items-center justify-center rounded-2xl bg-black">
				<Icons className="text-white" name="add" size={34} />
			</Pressable>
		</View>
	);
}
