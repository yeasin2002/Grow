import { cn } from "heroui-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { Icons } from "@/lib";

interface MonthlyCalendarProps {
	initialDate?: Date;
	onDateChange?: (date: Date) => void;
}

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const CARD_SHADOW = {
	shadowColor: "#000000",
	shadowOpacity: 0.04,
	shadowOffset: { width: 0, height: 10 },
	shadowRadius: 18,
	elevation: 4,
} as const;

function startOfMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfWeek(date: Date) {
	const normalizedDay = (date.getDay() + 6) % 7;
	const result = new Date(date);
	result.setDate(date.getDate() - normalizedDay);
	return result;
}

function sameDay(left: Date, right: Date) {
	return (
		left.getFullYear() === right.getFullYear() &&
		left.getMonth() === right.getMonth() &&
		left.getDate() === right.getDate()
	);
}

function shiftMonth(date: Date, offset: number) {
	return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

function shiftYear(date: Date, offset: number) {
	return new Date(date.getFullYear() + offset, date.getMonth(), 1);
}

function createCalendarRows(viewMonth: Date) {
	const rows: Array<Array<Date>> = [];
	const monthStart = startOfMonth(viewMonth);
	const firstVisibleDay = startOfWeek(monthStart);

	for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
		const row: Array<Date> = [];

		for (
			let columnIndex = 0;
			columnIndex < WEEK_DAYS.length;
			columnIndex += 1
		) {
			const date = new Date(firstVisibleDay);
			date.setDate(firstVisibleDay.getDate() + rowIndex * 7 + columnIndex);
			row.push(date);
		}

		rows.push(row);
	}

	return rows;
}

export function MonthlyCalendar({
	initialDate,
	onDateChange,
}: MonthlyCalendarProps) {
	const resolvedInitialDate = initialDate ?? new Date();
	const [visibleMonth, setVisibleMonth] = useState(() =>
		startOfMonth(resolvedInitialDate),
	);
	const [selectedDate, setSelectedDate] = useState(() => resolvedInitialDate);

	const year = visibleMonth.getFullYear();
	const monthName = MONTHS[visibleMonth.getMonth()];
	const calendarRows = createCalendarRows(visibleMonth);

	function handleSelectDate(date: Date) {
		setSelectedDate(date);
		setVisibleMonth(startOfMonth(date));
		onDateChange?.(date);
	}

	function handlePreviousMonth() {
		const nextMonth = shiftMonth(visibleMonth, -1);
		setVisibleMonth(nextMonth);
		setSelectedDate(nextMonth);
		onDateChange?.(nextMonth);
	}

	function handleNextMonth() {
		const nextMonth = shiftMonth(visibleMonth, 1);
		setVisibleMonth(nextMonth);
		setSelectedDate(nextMonth);
		onDateChange?.(nextMonth);
	}

	function handlePreviousYear() {
		const nextMonth = shiftYear(visibleMonth, -1);
		setVisibleMonth(nextMonth);
		setSelectedDate(nextMonth);
		onDateChange?.(nextMonth);
	}

	function handleNextYear() {
		const nextMonth = shiftYear(visibleMonth, 1);
		setVisibleMonth(nextMonth);
		setSelectedDate(nextMonth);
		onDateChange?.(nextMonth);
	}

	return (
		<View className="px-3 pt-3">
			<View
				className="rounded-4xl bg-[#F2F2F2] px-3.5 py-4"
				style={CARD_SHADOW}
			>
				<View className="flex-row items-center justify-between">
					<Pressable
						accessibilityLabel="Previous month"
						className="size-10 items-center justify-center rounded-2xl bg-white/95"
						onPress={handlePreviousMonth}
						style={CARD_SHADOW}
					>
						<Icons className="text-[#1D1D1D]" name="chevron-back" size={20} />
					</Pressable>

					<View className="items-center">
						<Text className="text-[22px] font-semibold tracking-[-0.4px] text-[#111111]">
							{monthName}
						</Text>

						<View className="mt-1.5 flex-row items-center gap-2">
							<Pressable
								accessibilityLabel="Previous year"
								className="size-7 items-center justify-center rounded-full bg-white/95"
								onPress={handlePreviousYear}
							>
								<Icons
									className="text-[#7A7A7A]"
									name="chevron-back"
									size={16}
								/>
							</Pressable>

							<Text className="text-[14px] font-medium text-[#8C8C8C]">
								{year}
							</Text>

							<Pressable
								accessibilityLabel="Next year"
								className="size-7 items-center justify-center rounded-full bg-white/95"
								onPress={handleNextYear}
							>
								<Icons
									className="text-[#7A7A7A]"
									name="chevron-forward"
									size={16}
								/>
							</Pressable>
						</View>
					</View>

					<Pressable
						accessibilityLabel="Next month"
						className="size-10 items-center justify-center rounded-2xl bg-white/95"
						onPress={handleNextMonth}
						style={CARD_SHADOW}
					>
						<Icons
							className="text-[#1D1D1D]"
							name="chevron-forward"
							size={20}
						/>
					</Pressable>
				</View>

				<View className="mt-4 flex-row justify-between px-1">
					{WEEK_DAYS.map((day) => (
						<Text
							key={day}
							className="w-[16.66%] text-center text-[12px] font-medium text-[#7A7A7A]"
						>
							{day}
						</Text>
					))}
				</View>

				<View className="mt-3 gap-2.5">
					{calendarRows.map((row) => {
						const rowStart = row[0];

						if (!rowStart) {
							return null;
						}

						return (
							<View
								key={`${rowStart.getFullYear()}-${rowStart.getMonth()}-${rowStart.getDate()}`}
								className="flex-row rounded-3xl bg-white px-1.5 py-3.5"
								style={CARD_SHADOW}
							>
								{row.map((date) => {
									const isCurrentMonth =
										date.getMonth() === visibleMonth.getMonth() &&
										date.getFullYear() === visibleMonth.getFullYear();
									const isSelected = sameDay(date, selectedDate);
									const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

									return (
										<Pressable
											key={dayKey}
											className="flex-1 items-center justify-center"
											onPress={() => handleSelectDate(date)}
										>
											<View
												className={cn(
													"h-9 w-9 items-center justify-center rounded-2xl",
													isSelected && "border border-[#E7E7E7] bg-[#F6F6F6]",
												)}
											>
												<Text
													className={cn(
														"text-[14px] font-medium",
														isCurrentMonth
															? "text-[#7B7B7B]"
															: "text-[#B3B3B3]",
														isSelected && "text-[#565656]",
													)}
												>
													{date.getDate()}
												</Text>
											</View>
										</Pressable>
									);
								})}
							</View>
						);
					})}
				</View>
			</View>
		</View>
	);
}
