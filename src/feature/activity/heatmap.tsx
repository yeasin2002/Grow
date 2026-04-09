import { Text, useWindowDimensions, View } from "react-native";

const DAY_LABELS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;

const MONTH_LABELS = [
	{ label: "Jan", column: 0 },
	{ label: "Feb", column: 5 },
	{ label: "Mar", column: 11 },
] as const;

const HEATMAP_LEVELS = [
	[1, 1, 3, 4, 1, 3, 2, 4, 4, 2, 3, 4, 1, 0],
	[1, 2, 3, 4, 2, 4, 2, 4, 4, 2, 3, 4, 4, 1],
	[1, 2, 3, 4, 2, 4, 2, 4, 4, 3, 3, 4, 1, 1],
	[2, 4, 3, 2, 4, 4, 2, 3, 2, 4, 3, 2, 4, 2],
	[2, 2, 1, 4, 1, 1, 1, 4, 2, 2, 3, 1, 4, 2],
	[1, 4, 3, 2, 4, 1, 1, 3, 1, 2, 3, 1, 4, 1],
	[1, 2, 3, 4, 2, 3, 1, 4, 4, 2, 3, 4, 1, 2],
] as const;

const LEVEL_STYLES = [
	"bg-[#dedede]",
	"bg-[#cccccc]",
	"bg-[#9d9d9d]",
	"bg-[#555555]",
	"bg-[#050505]",
] as const;

const COLUMN_KEYS = [
	"w1",
	"w2",
	"w3",
	"w4",
	"w5",
	"w6",
	"w7",
	"w8",
	"w9",
	"w10",
	"w11",
	"w12",
	"w13",
	"w14",
] as const;

const HEATMAP_ROWS = DAY_LABELS.map((day, rowIndex) => {
	const levels = HEATMAP_LEVELS[rowIndex] ?? HEATMAP_LEVELS[0];

	return {
		day,
		cells: COLUMN_KEYS.map((columnKey, columnIndex) => ({
			id: `${day}-${columnKey}`,
			level: levels[columnIndex] ?? 0,
		})),
	};
});

export function Heatmap() {
	const { width } = useWindowDimensions();
	const columns = HEATMAP_LEVELS[0].length;
	const boardWidth = width - 112;
	const cellSize = Math.max(18, Math.min(22, Math.floor(boardWidth / columns)));
	const cellRadius = Math.max(5, Math.floor(cellSize / 4));

	return (
		<View>
			<View className="ml-12 flex-row justify-between pr-2">
				{MONTH_LABELS.map((month) => (
					<Text
						key={month.label}
						className="absolute text-[16px] font-medium text-[#b0b0b0]"
						style={{
							left: month.column * (cellSize + 4),
						}}
					>
						{month.label}
					</Text>
				))}
			</View>

			<View className="mt-8 flex-row">
				<View className="mr-5 justify-between py-0.5">
					{DAY_LABELS.map((day) => (
						<View
							key={day}
							className="justify-center"
							style={{ height: cellSize }}
						>
							<Text className="text-[16px] font-medium text-[#b0b0b0]">
								{day}
							</Text>
						</View>
					))}
				</View>

				<View className="gap-1">
					{HEATMAP_ROWS.map((row) => (
						<View key={row.day} className="flex-row gap-1">
							{row.cells.map((cell) => (
								<View
									key={cell.id}
									className={LEVEL_STYLES[cell.level]}
									style={{
										width: cellSize,
										height: cellSize,
										borderRadius: cellRadius,
									}}
								/>
							))}
						</View>
					))}
				</View>
			</View>

			<View className="mt-5 border-t border-[#ebebeb] pt-5">
				<View className="flex-row items-center justify-center">
					<View className="mr-2.5 h-4 w-4 rounded-sm bg-[#d2d2d2]" />
					<Text className="text-[14px] font-medium text-[#7d7d7d]">
						Goal Not Meet
					</Text>
					<Text className="ml-8 text-[14px] font-medium text-[#7d7d7d]">
						Less
					</Text>
					<View className="ml-4 flex-row gap-1.5">
						{LEVEL_STYLES.map((levelStyle) => (
							<View
								key={levelStyle}
								className={levelStyle}
								style={{
									width: 16,
									height: 16,
									borderRadius: 4,
								}}
							/>
						))}
					</View>
				</View>
			</View>
		</View>
	);
}
