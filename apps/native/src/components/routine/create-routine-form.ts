import z from "zod";

export const WEEK_DAYS = [
	{ key: "mo", shortLabel: "Mo", label: "Monday" },
	{ key: "tu", shortLabel: "Tu", label: "Tuesday" },
	{ key: "we", shortLabel: "We", label: "Wednesday" },
	{ key: "th", shortLabel: "Th", label: "Thursday" },
	{ key: "fr", shortLabel: "Fr", label: "Friday" },
	{ key: "sa", shortLabel: "Sa", label: "Saturday" },
	{ key: "su", shortLabel: "Su", label: "Sunday" },
] as const;

export type DayKey = (typeof WEEK_DAYS)[number]["key"];

export type DayRoutineState = {
	selected: boolean;
	enabled: boolean;
	startTime: string;
	endTime: string;
};

export type RoutineFormValues = {
	subject: string;
	classNumber: string;
	roomNumber: string;
	breakTime: boolean;
	days: Record<DayKey, DayRoutineState>;
};

export const CARD_SHADOW = {
	shadowColor: "#000000",
	shadowOpacity: 0.06,
	shadowOffset: { width: 0, height: 10 },
	shadowRadius: 24,
	elevation: 4,
} as const;

export function createInitialValues(): RoutineFormValues {
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

export const routineSchema = z
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

export function buildErrorMap(error: z.ZodError<RoutineFormValues>) {
	const nextErrors: Record<string, string> = {};

	for (const issue of error.issues) {
		const path = issue.path.join(".");

		if (path && !nextErrors[path]) {
			nextErrors[path] = issue.message;
		}
	}

	return nextErrors;
}

export function removeErrorPaths(
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
