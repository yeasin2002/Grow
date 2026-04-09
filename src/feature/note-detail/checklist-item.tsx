import { Text, View } from "react-native";
import { Icons } from "@/lib";

type ChecklistItemProps = {
	label: string;
	completed?: boolean;
};

export function ChecklistItem({
	label,
	completed = false,
}: ChecklistItemProps) {
	return (
		<View className="flex-row items-center py-3">
			<View
				className={`mr-5 h-8 w-8 items-center justify-center rounded-[10px] border ${
					completed
						? "border-black bg-black"
						: "border-[#d9d9d9] bg-transparent"
				}`}
			>
				{completed ? (
					<Icons className="text-white" name="checkmark" size={20} />
				) : null}
			</View>

			<Text className="flex-1 text-[18px] font-medium tracking-[-0.2px] text-[#171717]">
				{label}
			</Text>
		</View>
	);
}
