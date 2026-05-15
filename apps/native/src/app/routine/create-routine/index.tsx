import { PageHero } from "@/components/shared/index";
import { Container } from "@/feature/homepage/container";
import { Icons } from "@/lib";
import {
	Button,
	cn,
	ControlField,
	FieldError,
	Input,
	Switch,
	TextField,
} from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";
import z from "zod";

const CARD_SHADOW = {
	shadowColor: "#000000",
	shadowOpacity: 0.06,
	shadowOffset: { width: 0, height: 10 },
	shadowRadius: 24,
	elevation: 4,
} as const;

const WEEK_DAYS = [
	{ key: "mo", shortLabel: "Mo", label: "Monday" },
	{ key: "tu", shortLabel: "Tu", label: "Tuesday" },
	{ key: "we", shortLabel: "We", label: "Wednesday" },
	{ key: "th", shortLabel: "Th", label: "Thursday" },
	{ key: "fr", shortLabel: "Fr", label: "Friday" },
	{ key: "sa", shortLabel: "Sa", label: "Saturday" },
	{ key: "su", shortLabel: "Su", label: "Sunday" },
] as const;

type DayKey = (typeof WEEK_DAYS)[number]["key"];

type DayRoutineState = {
	selected: boolean;
	enabled: boolean;
	startTime: string;
	endTime: string;
};

type RoutineFormValues = {
	subject: string;
	classNumber: string;
	roomNumber: string;
	breakTime: boolean;
	days: Record<DayKey, DayRoutineState>;
};

function createInitialValues(): RoutineFormValues {
	return {
		subject: "",
		classNumber: "",
		roomNumber: "",
		breakTime: true,
		days: {
			mo: {
				selected: true,
				enabled: true,
				startTime: "9:00 AM",
				endTime: "10:45 AM",
			},
			tu: {
				selected: false,
				enabled: false,
				startTime: "",
				endTime: "",
			},
			we: {
				selected: true,
				enabled: true,
				startTime: "9:00 AM",
				endTime: "8:00 PM",
			},
			th: {
				selected: false,
				enabled: false,
				startTime: "",
				endTime: "",
			},
			fr: {
				selected: false,
				enabled: false,
				startTime: "",
				endTime: "",
			},
			sa: {
				selected: false,
				enabled: false,
				startTime: "",
				endTime: "",
			},
			su: {
				selected: false,
				enabled: false,
				startTime: "",
				endTime: "",
			},
		},
	};
}

const dayRoutineSchema = z.object({
	selected: z.boolean(),
	enabled: z.boolean(),
	startTime: z.string(),
	endTime: z.string(),
});

const routineSchema = z
	.object({
		subject: z.string().trim().min(1, "Subject is required"),
		classNumber: z
			.string()
			.trim()
			.min(1, "Class is required")
			.regex(/^\d+$/, "Class must be a number"),
		roomNumber: z
			.string()
			.trim()
			.min(1, "Room is required")
			.regex(/^\d+$/, "Room must be a number"),
		breakTime: z.boolean(),
		days: z.object({
			mo: dayRoutineSchema,
			tu: dayRoutineSchema,
			we: dayRoutineSchema,
			th: dayRoutineSchema,
			fr: dayRoutineSchema,
			sa: dayRoutineSchema,
			su: dayRoutineSchema,
		}),
	})
	.superRefine((value, context) => {
		const selectedDays = WEEK_DAYS.filter(
			({ key }) => value.days[key].selected,
		);

		if (selectedDays.length === 0) {
			context.addIssue({
				code: "custom",
				path: ["days"],
				message: "Select at least one class day",
			});
		}

		for (const { key, label } of WEEK_DAYS) {
			const routine = value.days[key];

			if (!routine.selected || !routine.enabled) {
				continue;
			}

			if (!routine.startTime.trim()) {
				context.addIssue({
					code: "custom",
					path: ["days", key, "startTime"],
					message: `Add a start time for ${label}`,
				});
			}

			if (!routine.endTime.trim()) {
				context.addIssue({
					code: "custom",
					path: ["days", key, "endTime"],
					message: `Add an end time for ${label}`,
				});
			}
		}
	});

function buildErrorMap(error: z.ZodError<RoutineFormValues>) {
	const nextErrors: Record<string, string> = {};

	for (const issue of error.issues) {
		const path = issue.path.join(".");

		if (path && !nextErrors[path]) {
			nextErrors[path] = issue.message;
		}
	}

	return nextErrors;
}

function removeErrorPaths(
	currentErrors: Record<string, string>,
	pathsToClear: string[],
) {
	const nextErrors = { ...currentErrors };

	for (const key of Object.keys(nextErrors)) {
		if (
			pathsToClear.some((path) => key === path || key.startsWith(`${path}.`))
		) {
			delete nextErrors[key];
		}
	}

	return nextErrors;
}

function HeroSwitch({
	isSelected,
	onSelectedChange,
	activeColor,
}: {
	isSelected: boolean;
	onSelectedChange: (nextValue: boolean) => void;
	activeColor: string;
}) {
	return (
		<Switch
			isSelected={isSelected}
			onSelectedChange={onSelectedChange}
			className="h-8 w-13.5"
			animation={{
				backgroundColor: {
					value: ["#dbdbdb", activeColor],
				},
			}}
		>
			<Switch.Thumb
				className="size-7"
				animation={{
					left: {
						value: 2,
						springConfig: {
							damping: 30,
							stiffness: 300,
							mass: 1,
						},
					},
					backgroundColor: {
						value: ["#ffffff", "#ffffff"],
					},
				}}
			/>
		</Switch>
	);
}

function TimeInputCard({
	label,
	value,
	onChangeText,
	error,
}: {
	label: string;
	value: string;
	onChangeText: (nextValue: string) => void;
	error?: string;
}) {
	return (
		<View className="flex-1 gap-2">
			<View
				className={cn(
					"flex-row items-center rounded-[18px] border bg-white px-4 py-3.5",
					error ? "border-[#ff5a5f]" : "border-[#ececec]",
				)}
				style={CARD_SHADOW}
			>
				<Text className="mr-2.5 text-[14px] font-medium text-[#c4c4c4]">
					{label}
				</Text>

				<Input
					value={value}
					onChangeText={onChangeText}
					placeholder={label}
					className="min-h-0 flex-1 border-0 bg-transparent p-0 text-right font-semibold text-[15px] text-[#1a1a1a]"
					placeholderColorClassName="text-[#d2d2d2]"
				/>
			</View>

			{error ? (
				<Text className="px-1 text-[13px] text-[#ef4444]">{error}</Text>
			) : null}
		</View>
	);
}

function AddRoutineButton({
	isDisabled,
	onPress,
}: {
	isDisabled: boolean;
	onPress: () => void;
}) {
	return (
		<Button
			variant="outline"
			onPress={onPress}
			isDisabled={isDisabled}
			className="h-15 rounded-[18px] border border-[#545454] bg-transparent"
		>
			<Icons className="text-[#111111]" name="add" size={20} />
			<Button.Label className="ml-2 font-semibold text-[16px] text-[#111111]">
				Add Another Routine
			</Button.Label>
		</Button>
	);
}

const CreateRoutine = () => {
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
			<PageHero
				title="Create Routine"
				subtitle={`${selectedDayCount === 1 ? "Day" : "Days"} Routine`}
				className="mt-14"
			/>
			<View className="px-6 pb-8 pt-6">
				<View className="mt-11 gap-5">
					<TextField isInvalid={Boolean(errors.subject)}>
						<Text className="mb-2.5 font-semibold text-[17px] text-[#111111]">
							Subject
						</Text>
						<Input
							value={values.subject}
							onChangeText={(nextValue) =>
								updateTextValue("subject", nextValue)
							}
							placeholder="Physics"
							className="min-h-17 rounded-[18px] border border-[#e8e8e8] bg-white px-5 text-[17px] text-[#111111]"
							placeholderColorClassName="text-[#c2c2c2]"
							style={CARD_SHADOW}
						/>
						{errors.subject ? <FieldError>{errors.subject}</FieldError> : null}
					</TextField>

					<TextField isInvalid={Boolean(errors.classNumber)}>
						<Text className="mb-2.5 font-semibold text-[17px] text-[#111111]">
							Class
						</Text>
						<Input
							value={values.classNumber}
							onChangeText={(nextValue) =>
								updateTextValue("classNumber", nextValue)
							}
							placeholder="Enter class number :"
							keyboardType="number-pad"
							className="min-h-17 rounded-[18px] border border-[#e8e8e8] bg-white px-5 text-[17px] text-[#111111]"
							placeholderColorClassName="text-[#c2c2c2]"
							style={CARD_SHADOW}
						/>
						{errors.classNumber ? (
							<FieldError>{errors.classNumber}</FieldError>
						) : null}
					</TextField>

					<TextField isInvalid={Boolean(errors.roomNumber)}>
						<Text className="mb-2.5 font-semibold text-[17px] text-[#111111]">
							Room
						</Text>
						<Input
							value={values.roomNumber}
							onChangeText={(nextValue) =>
								updateTextValue("roomNumber", nextValue)
							}
							placeholder="Enter room number :"
							keyboardType="number-pad"
							className="min-h-17 rounded-[18px] border border-[#e8e8e8] bg-white px-5 text-[17px] text-[#111111]"
							placeholderColorClassName="text-[#c2c2c2]"
							style={CARD_SHADOW}
						/>
						{errors.roomNumber ? (
							<FieldError>{errors.roomNumber}</FieldError>
						) : null}
					</TextField>
				</View>

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

				<View className="mt-11">
					<Text className="font-semibold text-[17px] text-[#111111]">
						Select Class Time
					</Text>

					<View className="mt-5 rounded-full bg-[#ebeae6] p-1.5">
						<View className="flex-row items-center justify-between gap-1">
							{WEEK_DAYS.map((day) => {
								const isSelected = values.days[day.key].selected;

								return (
									<Button
										key={day.key}
										variant={isSelected ? "primary" : "ghost"}
										onPress={() => toggleDaySelection(day.key)}
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
};

export default CreateRoutine;
