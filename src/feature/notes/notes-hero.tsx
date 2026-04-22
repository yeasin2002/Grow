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
			className={`absolute h-17 w-17 items-center justify-center rounded-[20px] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.10)] ${className}`}
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
			<View className="relative h-27 w-48">
				<HeroIconCard
					className="left-5 top-6 -rotate-2"
					icon="book-outline"
					iconSize={24}
				/>
				<HeroIconCard
					className="left-19 top-0 rotate-12"
					icon="document-text-outline"
					iconSize={26}
				/>
				<HeroIconCard
					className="left-31 top-4 rotate-[-14deg]"
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
