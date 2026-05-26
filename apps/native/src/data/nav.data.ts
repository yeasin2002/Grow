import type { Href } from "expo-router";
import type { ComponentProps } from "react";
import type { Icons } from "@/lib";

type IconName = NonNullable<ComponentProps<typeof Icons>["name"]>;
export type TabRouteName = "index" | "notes/index" | "routine/index";

export const NAVIGATION_ITEMS = [
	{
		label: "Home",
		activeIcon: "home",
		inactiveIcon: "home-outline",
		route: "/",
		tabRouteName: "index",
		matchRoutes: ["/", "/index"],
	},
	{
		label: "Note",
		activeIcon: "document-text",
		inactiveIcon: "document-text-outline",
		route: "/notes",
		tabRouteName: "notes/index",
		matchRoutes: ["/notes"],
	},
	{
		label: "Routine",
		activeIcon: "calendar",
		inactiveIcon: "calendar-outline",
		route: "/routine",
		tabRouteName: "routine/index",
		matchRoutes: ["/routine"],
	},
] satisfies ReadonlyArray<{
	label: string;
	activeIcon: IconName;
	inactiveIcon: IconName;
	route: Href;
	tabRouteName: TabRouteName;
	matchRoutes: readonly string[];
}>;

export const ACTION_NAVIGATION_ITEMS = [
	{
		label: "Activity",
		icon: "code-working", // todo: change the icon
		route: "/activity",
	},
	{
		label: "Calendar",
		icon: "calendar",
		route: "/calendar",
	},
	// {
	// 	label: "Activity",
	// 	icon: "sparkles-outline",
	// 	route: "/activity",
	// },
] satisfies ReadonlyArray<{
	label: string;
	icon: IconName;
	route: Href;
}>;
