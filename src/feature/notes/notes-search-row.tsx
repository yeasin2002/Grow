import { Input } from "heroui-native";
import { Pressable, View } from "react-native";
import { Icons } from "@/lib";

export function NotesSearchRow() {
	return (
		<View className="mt-8 flex-row items-center gap-2">
			<Input
				placeholder="Find any note or documents"
				className="flex-1 flex-row items-center rounded-2xl border border-[#dddddd] bg-transparent  py-8 min-h-12 pl-2 placeholder:pl-6"
			/>
			<Pressable className="size-12 items-center justify-center rounded-2xl bg-black active:opacity-90">
				<Icons className="text-white" name="add" size={34} />
			</Pressable>
		</View>
	);
}
