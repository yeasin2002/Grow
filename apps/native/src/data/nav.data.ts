import type { Icons } from "@/lib";
import type { Href } from "expo-router";
import type { ComponentProps } from "react";

type IconName = NonNullable<ComponentProps<typeof Icons>["name"]>;

export const NAVIGATION_ITEMS = [
	{
		label: "Home",
		activeIcon: "home",
		inactiveIcon: "home-outline",
		route: "/",
		matchRoutes: ["/"],
	},
	{
		label: "Note",
		activeIcon: "document-text",
		inactiveIcon: "document-text-outline",
		route: "/notes",
		matchRoutes: ["/notes"],
	},
	{
		label: "Routine",
		activeIcon: "calendar",
		inactiveIcon: "calendar-outline",
		route: "/routine",
		matchRoutes: ["/routine"],
	},
] satisfies ReadonlyArray<{
	label: string;
	activeIcon: IconName;
	inactiveIcon: IconName;
	route: Href;
	matchRoutes: readonly string[];
}>;

export const ACTION_NAVIGATION_ITEMS = [
	{
		label: "Notifications",
		icon: "notifications-outline",
		route: "/notifications",
	},
	{
		label: "Timer",
		icon: "timer-outline",
		route: "/timer",
	},
	{
		label: "Activity",
		icon: "sparkles-outline",
		route: "/activity",
	},
] satisfies ReadonlyArray<{
	label: string;
	icon: IconName;
	route: Href;
}>;
