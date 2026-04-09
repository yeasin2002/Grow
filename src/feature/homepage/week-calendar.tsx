import { Text, View } from "react-native";

interface WeekCalendarProps {
	selectedDate?: number;
}

export function WeekCalendar({ selectedDate = 10 }: WeekCalendarProps) {
	const weekDays = [
		{ day: "Mon", date: 8 },
		{ day: "Tue", date: 9 },
		{ day: "Wed", date: 10 },
		{ day: "Thu", date: 11 },
		{ day: "Fri", date: 12 },
		{ day: "Sat", date: 13 },
	];

	return (
		<View className="px-6 mb-6 bg-[#F9F9F9] rounded-2xl mx-4 py-2">
			<View className="flex-row justify-between">
				{weekDays.map((item) => (
					<View key={item.date} className="items-center">
						<Text className="text-sm text-default-400 mb-2">{item.day}</Text>
						<View
							className={`h-10 w-10 items-center justify-center rounded-full ${
								item.date === selectedDate ? "bg-foreground" : "bg-transparent"
							}`}
						>
							<Text
								className={`text-base font-medium ${
									item.date === selectedDate
										? "text-background"
										: "text-foreground"
								}`}
							>
								{item.date}
							</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
}
