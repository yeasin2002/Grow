import { View } from "react-native";

export type HeatmapGraphCell = {
  id: string;
  level: number;
};

export type HeatmapGraphRow = {
  id: string;
  cells: readonly HeatmapGraphCell[];
};

type HeatmapGraphProps = {
  rows: readonly HeatmapGraphRow[];
  levelClassNames: readonly string[];
  cellSize: number;
  cellRadius?: number;
  rowGap?: number;
  columnGap?: number;
};

export function HeatmapGraph({
  rows,
  levelClassNames,
  cellSize,
  cellRadius = 4,
  rowGap = 4,
  columnGap = 4,
}: HeatmapGraphProps) {
  return (
    <View style={{ gap: rowGap }}>
      {rows.map((row) => (
        <View key={row.id} style={{ flexDirection: "row", gap: columnGap }}>
          {row.cells.map((cell) => (
            <View
              key={cell.id}
              className={levelClassNames[cell.level] ?? levelClassNames[0]}
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
  );
}
