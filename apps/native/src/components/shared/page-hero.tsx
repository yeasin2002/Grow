import { cn } from "heroui-native";
import { Text, View } from "react-native";
import { Icons } from "@/lib";

type HeroMainProps = {
	title: string;
	subtitle: string;
	className?: string;
};

export function PageHero({
	title = "",
	subtitle = "",
	className = "",
}: HeroMainProps) {
	return (
		<View className={cn("items-center", className)}>
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
				{title}
			</Text>
			<Text className="mt-1 text-[16px] font-medium tracking-[-0.2px] text-[#898989]">
				{subtitle}
			</Text>
		</View>
	);
}

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

const CARD_SHADOW = {
	shadowColor: "#000000",
	shadowOpacity: 0.06,
	shadowOffset: { width: 0, height: 10 },
	shadowRadius: 24,
	elevation: 4,
} as const;

export function HeaderArtwork() {
	return (
		<View className="items-center">
			<View className="relative h-29.5 w-37.5">
				<View
					className="absolute left-4 top-4.5 size-14 items-center justify-center rounded-[18px] bg-white"
					style={CARD_SHADOW}
				>
					<Icons className="text-[#c9c9c9]" name="people" size={24} />
				</View>

				<View
					className="absolute left-14.5 top-0 size-14 rotate-14 items-center justify-center rounded-[18px] bg-white"
					style={CARD_SHADOW}
				>
					<Icons className="text-[#c9c9c9]" name="time-outline" size={24} />
				</View>

				<View
					className="absolute left-19.5 top-3 size-14 rotate-[-14deg] items-center justify-center rounded-[18px] bg-white"
					style={CARD_SHADOW}
				>
					<Icons
						className="text-[#c9c9c9]"
						name="clipboard-outline"
						size={24}
					/>
				</View>
			</View>
		</View>
	);
}
