import type { CalendarItemDayProps } from "@marceloterreiro/flash-calendar";
import {
	Calendar,
	fromDateId,
	toDateId,
	useCalendar,
} from "@marceloterreiro/flash-calendar";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Icons } from "@/lib";

interface FlashCalendarProps {
	initialDate?: Date;
	onDateChange?: (date: Date) => void;
}

type CalendarDayTheme = NonNullable<CalendarItemDayProps["theme"]>;
type CalendarDayThemeParams = Parameters<
	NonNullable<CalendarDayTheme["base"]>
>[0];

const CARD_SHADOW = {
	borderColor: "#ECECEC",
	borderWidth: 1,
	shadowColor: "#000000",
	shadowOpacity: 0.02,
	shadowOffset: { width: 0, height: 4 },
	shadowRadius: 10,
	elevation: 1,
} as const;

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
	month: "long",
});
const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", {
	weekday: "short",
});

const DAY_THEME = {
	base: ({ isDifferentMonth }: CalendarDayThemeParams) => ({
		container: {
			backgroundColor: "transparent",
		},
		content: {
			color: isDifferentMonth ? "#C4C4C4" : "#7A7A7A",
			fontSize: 15,
			fontWeight: "500",
		},
	}),
	active: () => ({
		container: {
			backgroundColor: "#111111",
			borderColor: "#111111",
			borderWidth: 1,
		},
		content: {
			color: "#FFFFFF",
			fontWeight: "600",
		},
	}),
	today: ({ isDifferentMonth }: CalendarDayThemeParams) => ({
		container: {
			backgroundColor: "transparent",
			borderColor: "#D5D5D5",
			borderWidth: 1,
		},
		content: {
			color: isDifferentMonth ? "#C4C4C4" : "#5F5F5F",
			fontWeight: "600",
		},
	}),
	disabled: ({ isDifferentMonth }: CalendarDayThemeParams) => ({
		container: {
			backgroundColor: "transparent",
		},
		content: {
			color: isDifferentMonth ? "#D9D9D9" : "#CDCDCD",
		},
	}),
} satisfies CalendarDayTheme;

function startOfMonthId(date: Date) {
	return toDateId(new Date(date.getFullYear(), date.getMonth(), 1));
}

function shiftMonthId(monthId: string, offset: number) {
	const date = fromDateId(monthId);
	return startOfMonthId(
		new Date(date.getFullYear(), date.getMonth() + offset, 1),
	);
}

const formatWeekDay = (date: Date) => WEEKDAY_FORMATTER.format(date);

export function FlashCalendar({
	initialDate = new Date(),
	onDateChange,
}: FlashCalendarProps) {
	const initialMonthId = startOfMonthId(initialDate);
	const [visibleMonthId, setVisibleMonthId] = useState(initialMonthId);
	const [selectedDateId, setSelectedDateId] = useState(() =>
		toDateId(initialDate),
	);

	const visibleMonth = fromDateId(visibleMonthId);
	const monthLabel = MONTH_FORMATTER.format(visibleMonth);

	const { weeksList, weekDaysList } = useCalendar({
		calendarMonthId: visibleMonthId,
		calendarFirstDayOfWeek: "monday",
		calendarFormatLocale: "en-US",
		calendarActiveDateRanges: [
			{
				startId: selectedDateId,
				endId: selectedDateId,
			},
		],
		getCalendarWeekDayFormat: formatWeekDay,
	});

	function handleSelectDate(dateId: string) {
		const nextDate = fromDateId(dateId);
		const nextMonthId = startOfMonthId(nextDate);

		setSelectedDateId(dateId);
		setVisibleMonthId(nextMonthId);
		onDateChange?.(nextDate);
	}

	function handlePreviousMonth() {
		const nextMonthId = shiftMonthId(visibleMonthId, -1);
		setVisibleMonthId(nextMonthId);
		setSelectedDateId(nextMonthId);
		onDateChange?.(fromDateId(nextMonthId));
	}

	function handleNextMonth() {
		const nextMonthId = shiftMonthId(visibleMonthId, 1);
		setVisibleMonthId(nextMonthId);
		setSelectedDateId(nextMonthId);
		onDateChange?.(fromDateId(nextMonthId));
	}

	return (
		<View className="px-3 pt-3">
			<View
				className="rounded-[28px] bg-white px-3.5 py-4"
				style={CARD_SHADOW}
			>
				<View className="flex-row items-center justify-between">
					<Pressable
						accessibilityLabel="Previous month"
						className="size-9 items-center justify-center rounded-2xl bg-[#F6F6F6]"
						onPress={handlePreviousMonth}
					>
						<Icons className="text-[#1B1B1B]" name="chevron-back" size={18} />
					</Pressable>

					<View className="items-center">
						<Text className="text-[21px] font-semibold tracking-[-0.4px] text-[#111111]">
							{monthLabel}
						</Text>

						<Text className="mt-1 text-[13px] font-medium text-[#9A9A9A]">
							{visibleMonth.getFullYear()}
						</Text>
					</View>

					<Pressable
						accessibilityLabel="Next month"
						className="size-9 items-center justify-center rounded-2xl bg-[#F6F6F6]"
						onPress={handleNextMonth}
					>
						<Icons
							className="text-[#1B1B1B]"
							name="chevron-forward"
							size={18}
						/>
					</Pressable>
				</View>

				<View className="mt-5 flex-row px-1">
					{weekDaysList.map((day) => (
						<Text
							key={day}
							className="flex-1 text-center text-[11px] font-medium uppercase tracking-[0.8px] text-[#9A9A9A]"
						>
							{day}
						</Text>
					))}
				</View>

				<View className="mt-4 gap-2">
					{weeksList.map((week) => {
						const weekStart = week[0];

						if (!weekStart) {
							return null;
						}

						return (
							<View
								key={weekStart.id}
								className="flex-row rounded-3xl bg-[#FAFAFA] px-1.5 py-3"
							>
								{week.map((day) => (
									<View key={day.id} className="flex-1">
										<Calendar.Item.Day
											height={46}
											metadata={day}
											onPress={handleSelectDate}
											theme={DAY_THEME}
										>
											{day.displayLabel}
										</Calendar.Item.Day>
									</View>
								))}
							</View>
						);
					})}
				</View>
			</View>
		</View>
	);
}
