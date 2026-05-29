import {
	Button,
	ControlField,
	cn,
	FieldError,
	Input,
	TextField,
} from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { Container } from "@/components/homepage/container";
import {
	buildErrorMap,
	CARD_SHADOW,
	createInitialValues,
	type DayKey,
	type RoutineFormValues,
	removeErrorPaths,
	routineSchema,
	WEEK_DAYS,
} from "@/components/routine/create-routine-form";
import {
	AddRoutineButton,
	HeroSwitch,
	TimeInputCard,
} from "@/components/routine/create-routine-parts";
import { PageHero } from "@/components/shared";
import { Icons } from "@/lib";

function CreateRoutineScreen() {
	const [values, setValues] = useState<RoutineFormValues>(() =>
		createInitialValues(),
	);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const selectedDays = WEEK_DAYS.filter(({ key }) => values.days[key].selected);
	const selectedDayCount = selectedDays.length;
	const hasEveryDaySelected = selectedDayCount === WEEK_DAYS.length;

	function clearErrors(paths: string[]) {
		setErrors((current) => removeErrorPaths(current, paths));
	}

	function updateTextValue(
		field: "subject" | "classNumber" | "roomNumber",
		nextValue: string,
	) {
		setValues((current) => ({
			...current,
			[field]: nextValue,
		}));
		clearErrors([field]);
	}

	function updateBreakTime(nextValue: boolean) {
		setValues((current) => ({
			...current,
			breakTime: nextValue,
		}));
	}

	function toggleDaySelection(dayKey: DayKey) {
		setValues((current) => {
			const currentDay = current.days[dayKey];

			return {
				...current,
				days: {
					...current.days,
					[dayKey]: {
						...currentDay,
						selected: !currentDay.selected,
						enabled: !currentDay.selected,
					},
				},
			};
		});
		clearErrors(["days", `days.${dayKey}`]);
	}

	function toggleDayEnabled(dayKey: DayKey, nextValue: boolean) {
		setValues((current) => ({
			...current,
			days: {
				...current.days,
				[dayKey]: {
					...current.days[dayKey],
					enabled: nextValue,
				},
			},
		}));
		clearErrors([`days.${dayKey}`]);
	}

	function updateDayTime(
		dayKey: DayKey,
		field: "startTime" | "endTime",
		nextValue: string,
	) {
		setValues((current) => ({
			...current,
			days: {
				...current.days,
				[dayKey]: {
					...current.days[dayKey],
					[field]: nextValue,
				},
			},
		}));
		clearErrors([`days.${dayKey}.${field}`]);
	}

	function addAnotherRoutine() {
		const nextDay = WEEK_DAYS.find(({ key }) => !values.days[key].selected);

		if (!nextDay) {
			return;
		}

		setValues((current) => ({
			...current,
			days: {
				...current.days,
				[nextDay.key]: {
					...current.days[nextDay.key],
					selected: true,
					enabled: true,
				},
			},
		}));
		clearErrors(["days"]);
	}

	function removeRoutine(dayKey: DayKey) {
		setValues((current) => ({
			...current,
			days: {
				...current.days,
				[dayKey]: {
					...current.days[dayKey],
					selected: false,
					enabled: false,
				},
			},
		}));
		clearErrors(["days", `days.${dayKey}`]);
	}

	function handleSubmit() {
		const validation = routineSchema.safeParse(values);

		if (!validation.success) {
			setErrors(buildErrorMap(validation.error));
			return;
		}

		setErrors({});
		console.log("create-routine", validation.data);
	}

	return (
		<Container className="bg-[#f4f3f0]">
			<View className="mt-14">
				<PageHero
					title="Create Routine"
					subtitle={`${selectedDayCount} ${selectedDayCount === 1 ? "Day" : "Days"} Routine`}
				/>
			</View>

			<View className="px-6 pb-8 pt-6">
				<RoutineDetailsSection
					classNumber={values.classNumber}
					roomNumber={values.roomNumber}
					subject={values.subject}
					errors={errors}
					onTextChange={updateTextValue}
				/>

				<ControlField
					isSelected={values.breakTime}
					onSelectedChange={updateBreakTime}
					className="mt-10 flex-row items-center rounded-[20px] bg-[#ebeae6] px-4 py-4.5"
				>
					<View className="flex-1 flex-row items-center gap-3">
						<View className="items-center justify-center">
							<Icons className="text-[#111111]" name="cafe" size={22} />
						</View>

						<Text className="font-semibold text-[17px] text-[#111111]">
							Break Time
						</Text>
					</View>

					<HeroSwitch
						isSelected={values.breakTime}
						onSelectedChange={updateBreakTime}
						activeColor="#ff3045"
					/>
				</ControlField>

				<DaySelectorSection
					errors={errors}
					selectedDays={values.days}
					onToggleDay={toggleDaySelection}
				/>

				<View className="mt-9 gap-8">
					{selectedDays.map((day) => {
						const dayState = values.days[day.key];

						return (
							<View key={day.key}>
								<View className="flex-row items-center justify-between">
									<Text className="font-medium text-[17px] text-[#111111]">
										{day.label}
									</Text>

									<HeroSwitch
										isSelected={dayState.enabled}
										onSelectedChange={(nextValue) =>
											toggleDayEnabled(day.key, nextValue)
										}
										activeColor="#15b56e"
									/>
								</View>

								<View className="mt-5 flex-row items-start gap-3">
									<TimeInputCard
										label="From"
										value={dayState.startTime}
										onChangeText={(nextValue) =>
											updateDayTime(day.key, "startTime", nextValue)
										}
										error={errors[`days.${day.key}.startTime`]}
									/>

									<TimeInputCard
										label="To"
										value={dayState.endTime}
										onChangeText={(nextValue) =>
											updateDayTime(day.key, "endTime", nextValue)
										}
										error={errors[`days.${day.key}.endTime`]}
									/>

									<Button
										isIconOnly
										variant="secondary"
										onPress={() => removeRoutine(day.key)}
										className="size-14.5 rounded-[18px] border border-[#ececec] bg-white"
										style={CARD_SHADOW}
									>
										<Icons className="text-[#6f6f6f]" name="remove" size={22} />
									</Button>
								</View>
							</View>
						);
					})}
				</View>

				<View className="mt-12 gap-4">
					<AddRoutineButton
						isDisabled={hasEveryDaySelected}
						onPress={addAnotherRoutine}
					/>

					<Button
						variant="primary"
						onPress={handleSubmit}
						className="h-15 rounded-[18px] bg-[#111111]"
					>
						<Button.Label className="font-semibold text-[16px] text-white">
							Create Routine
						</Button.Label>
					</Button>
				</View>
			</View>
		</Container>
	);
}

function RoutineDetailsSection({
	subject,
	classNumber,
	roomNumber,
	errors,
	onTextChange,
}: {
	subject: string;
	classNumber: string;
	roomNumber: string;
	errors: Record<string, string>;
	onTextChange: (
		field: "subject" | "classNumber" | "roomNumber",
		nextValue: string,
	) => void;
}) {
	return (
		<View className="mt-11 gap-5">
			<FormTextField
				error={errors.subject}
				label="Subject"
				placeholder="Physics"
				value={subject}
				onChangeText={(nextValue) => onTextChange("subject", nextValue)}
			/>

			<FormTextField
				error={errors.classNumber}
				keyboardType="number-pad"
				label="Class"
				placeholder="Enter class number :"
				value={classNumber}
				onChangeText={(nextValue) => onTextChange("classNumber", nextValue)}
			/>

			<FormTextField
				error={errors.roomNumber}
				keyboardType="number-pad"
				label="Room"
				placeholder="Enter room number :"
				value={roomNumber}
				onChangeText={(nextValue) => onTextChange("roomNumber", nextValue)}
			/>
		</View>
	);
}

function FormTextField({
	label,
	value,
	placeholder,
	error,
	keyboardType,
	onChangeText,
}: {
	label: string;
	value: string;
	placeholder: string;
	error?: string;
	keyboardType?: "default" | "number-pad";
	onChangeText: (nextValue: string) => void;
}) {
	return (
		<TextField isInvalid={Boolean(error)}>
			<Text className="mb-2.5 font-semibold text-[17px] text-[#111111]">
				{label}
			</Text>
			<Input
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				keyboardType={keyboardType}
				className="min-h-17 rounded-[18px] border border-[#e8e8e8] bg-white px-5 text-[17px] text-[#111111]"
				placeholderColorClassName="text-[#c2c2c2]"
				style={CARD_SHADOW}
			/>
			{error ? <FieldError>{error}</FieldError> : null}
		</TextField>
	);
}

function DaySelectorSection({
	selectedDays,
	errors,
	onToggleDay,
}: {
	selectedDays: RoutineFormValues["days"];
	errors: Record<string, string>;
	onToggleDay: (dayKey: DayKey) => void;
}) {
	return (
		<View className="mt-11">
			<Text className="font-semibold text-[17px] text-[#111111]">
				Select Class Time
			</Text>

			<View className="mt-5 rounded-full bg-[#ebeae6] p-1.5">
				<View className="flex-row items-center justify-between gap-1">
					{WEEK_DAYS.map((day) => {
						const isSelected = selectedDays[day.key].selected;

						return (
							<Button
								key={day.key}
								variant={isSelected ? "primary" : "ghost"}
								onPress={() => onToggleDay(day.key)}
								className={cn(
									"h-11.5 flex-1 rounded-full px-0",
									isSelected ? "bg-black" : "bg-transparent shadow-none",
								)}
							>
								<Button.Label
									className={cn(
										"font-medium text-[15px]",
										isSelected ? "text-white" : "text-[#808080]",
									)}
								>
									{day.shortLabel}
								</Button.Label>
							</Button>
						);
					})}
				</View>
			</View>

			{errors.days ? (
				<Text className="mt-3 px-1 text-[13px] text-[#ef4444]">
					{errors.days}
				</Text>
			) : null}
		</View>
	);
}

export default CreateRoutineScreen;
