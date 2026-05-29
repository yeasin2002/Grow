import { Button, cn } from "heroui-native";
import { Text, View } from "react-native";

import { Icons } from "@/lib";

const TIMELINE_SHADOW = {
	shadowColor: "#000000",
	shadowOpacity: 0.05,
	shadowOffset: { width: 0, height: 10 },
	shadowRadius: 20,
	elevation: 3,
} as const;

export type RoutineTimelineEntry =
	| {
			id: string;
			type: "class";
			timeLabel: string;
			title: string;
			primaryDetail: string;
			secondaryDetail: string;
	  }
	| {
			id: string;
			type: "break";
			label: string;
	  };

type RoutineTimelineProps = {
	entries: RoutineTimelineEntry[];
};

export function RoutineTimeline({ entries = [] }: RoutineTimelineProps) {
	return (
		<View className="relative mt-8 pb-8">
			<View className="absolute bottom-0 left-6.5 top-4.5 border-l border-dashed border-[#c9c9c9]" />

			<View className="gap-4">
				{entries.map((entry) =>
					entry.type === "break" ? (
						<BreakTimelineItem key={entry.id} label={entry.label} />
					) : (
						<ClassTimelineItem
							key={entry.id}
							primaryDetail={entry.primaryDetail}
							secondaryDetail={entry.secondaryDetail}
							timeLabel={entry.timeLabel}
							title={entry.title}
						/>
					),
				)}
			</View>
		</View>
	);
}

function TimePill({
	label,
	tone = "muted",
}: {
	label: string;
	tone?: "muted" | "dark";
}) {
	return (
		<View
			className={cn(
				"self-start rounded-full border px-3 py-2",
				tone === "dark"
					? "border-[#111111] bg-[#111111]"
					: "border-dashed border-[#c7c7c7] bg-[#f7f7f7]",
			)}
		>
			<Text
				className={cn(
					"text-[13px] font-medium tracking-[-0.15px]",
					tone === "dark" ? "text-white" : "text-[#8a8a8a]",
				)}
			>
				{label}
			</Text>
		</View>
	);
}

function ClassTimelineItem({
	timeLabel,
	title,
	primaryDetail,
	secondaryDetail,
}: {
	timeLabel: string;
	title: string;
	primaryDetail: string;
	secondaryDetail: string;
}) {
	return (
		<View className="pb-1">
			<TimePill label={timeLabel} />

			<View className="mt-3 flex-row">
				<View className="w-13.5 items-center">
					<View className="mt-5 size-3 rounded-full bg-[#f4f4f4]" />
				</View>

				<View className="flex-1 border-b border-[#ececec] pb-7 pt-5">
					<View className="flex-row items-start justify-between gap-4">
						<View className="flex-1 flex-row items-center">
							<Icons
								className="mr-3 text-[#111111]"
								name="caret-down"
								size={14}
							/>

							<Text className="flex-1 font-semibold text-[19px] tracking-[-0.35px] text-[#111111]">
								{title}
							</Text>
						</View>

						<View className="flex-row gap-2">
							<ActionIconButton icon="create-outline" tone="neutral" />
							<ActionIconButton icon="trash-outline" tone="danger" />
						</View>
					</View>

					<Text className="mt-8 text-[16px] font-medium text-[#1a1a1a]">
						{primaryDetail}
					</Text>
					{secondaryDetail ? (
						<Text className="mt-1.5 text-[14px] font-medium text-[#7f7f7f]">
							{secondaryDetail}
						</Text>
					) : null}
				</View>
			</View>
		</View>
	);
}

function BreakTimelineItem({ label }: { label: string }) {
	return (
		<View className="mt-1 flex-row">
			<View className="w-13.5 items-center">
				<View className="mt-5 size-3 rounded-full bg-[#f4f4f4]" />
			</View>

			<View className="pt-2">
				<TimePill label={label} tone="dark" />
			</View>
		</View>
	);
}

function ActionIconButton({
	icon,
	tone,
}: {
	icon: React.ComponentProps<typeof Icons>["name"];
	tone: "neutral" | "danger";
}) {
	return (
		<Button
			isIconOnly
			variant="ghost"
			onPress={() => {}}
			className={cn(
				"size-9 rounded-full border-0",
				tone === "danger" ? "bg-[#ffe8ea]" : "bg-white",
			)}
			style={TIMELINE_SHADOW}
		>
			<Icons
				className={tone === "danger" ? "text-[#ff5c67]" : "text-[#2d2d2d]"}
				name={icon}
				size={18}
			/>
		</Button>
	);
}
