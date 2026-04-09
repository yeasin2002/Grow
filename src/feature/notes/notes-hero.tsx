import { Text, View } from "react-native";
import { Icons } from "@/lib";

function HeroIconCard({
	className,
	icon,
	iconSize,
}: {
	className: string;
	icon: React.ComponentProps<typeof Icons>["name"];
	iconSize: number;
}) {
	return (
		<View
			className={`absolute h-[68px] w-[68px] items-center justify-center rounded-[20px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.10)] ${className}`}
		>
			<Icons className="text-[#d2d2d2]" name={icon} size={iconSize} />
		</View>
	);
}

type NotesHeroProps = {
	noteCount: number;
};

export function NotesHero({ noteCount }: NotesHeroProps) {
	return (
		<View className="items-center">
			<View className="relative h-[108px] w-[192px]">
				<HeroIconCard
					className="left-[20px] top-[24px] rotate-[-2deg]"
					icon="book-outline"
					iconSize={24}
				/>
				<HeroIconCard
					className="left-[76px] top-[0px] rotate-[12deg]"
					icon="document-text-outline"
					iconSize={26}
				/>
				<HeroIconCard
					className="left-[124px] top-[16px] rotate-[-14deg]"
					icon="calendar-outline"
					iconSize={24}
				/>
			</View>

			<Text className="mt-1 text-[30px] font-bold tracking-[-0.8px] text-black">
				My Notes
			</Text>
			<Text className="mt-1 text-[16px] font-medium tracking-[-0.2px] text-[#898989]">
				{noteCount} notes
			</Text>
		</View>
	);
}
