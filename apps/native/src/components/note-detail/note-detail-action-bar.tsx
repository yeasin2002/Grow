import { Pressable, Text, View } from "react-native";
import { Icons } from "@/lib";

function ActionPill({
	icon,
	label,
	active = false,
}: {
	icon: React.ComponentProps<typeof Icons>["name"];
	label: string;
	active?: boolean;
}) {
	return (
		<Pressable
			className={`flex-1 flex-row items-center justify-center rounded-[22px] px-5 py-5 ${
				active
					? "bg-black shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
					: "border border-[#dddddd] bg-transparent"
			}`}
		>
			<Icons
				className={`mr-3 ${active ? "text-white" : "text-[#5f5f5f]"}`}
				name={icon}
				size={20}
			/>
			<Text
				className={`text-base  font-medium tracking-[-0.3px] ${active ? "text-white" : "text-[#5f5f5f]"}`}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export function NoteDetailActionBar() {
	return (
		<View className="flex-row items-center gap-2">
			<ActionPill active icon="list-outline" label="Checklist" />
			<ActionPill icon="attach-outline" label="Attachment" />

			<Pressable className="ml-1 h-16 w-20.5 items-center justify-center rounded-3xl bg-black active:opacity-90">
				<Icons className="text-white" name="add" size={38} />
			</Pressable>
		</View>
	);
}
