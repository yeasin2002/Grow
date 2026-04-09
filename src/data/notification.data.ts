import type { Ionicons } from "@expo/vector-icons";

type NotificationItem = {
	id: string;
	icon: keyof typeof Ionicons.glyphMap;
	message: string;
	time: string;
};

type NotificationSection = {
	id: string;
	title: string;
	items: NotificationItem[];
};

export const notificationSections: NotificationSection[] = [
	{
		id: "today",
		title: "Today",
		items: [
			{
				id: "today-class",
				icon: "clipboard",
				message:
					"English Linguistics class will begin in 5 minutes. Please be ready to join.",
				time: "9:40 AM",
			},
			{
				id: "today-task",
				icon: "checkbox",
				message: "It’s time for your task check now !",
				time: "9:40 AM",
			},
		],
	},
	{
		id: "yesterday",
		title: "Yesterday",
		items: [
			{
				id: "yesterday-class",
				icon: "clipboard",
				message:
					"English Linguistics class will begin in 5 minutes. Please be ready to join.",
				time: "9:40 AM",
			},
			{
				id: "yesterday-task",
				icon: "checkbox",
				message: "It’s time for your task check now !",
				time: "9:40 AM",
			},
		],
	},
];
