import { Button, cn, Input, Switch } from "heroui-native";
import { Text, View } from "react-native";

import { Icons } from "@/lib";

import { CARD_SHADOW } from "./create-routine-form";

export function HeroSwitch({
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

export function TimeInputCard({
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

export function AddRoutineButton({
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
