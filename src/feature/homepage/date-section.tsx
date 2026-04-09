import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

interface DateSectionProps {
	title: string;
	children?: React.ReactNode;
	showAddButton?: boolean;
	onAddPress?: () => void;
}

export function DateSection({
	title,
	children,
	showAddButton = false,
	onAddPress,
}: DateSectionProps) {
	return (
		<View className="mx-6 mb-6">
			<View className="flex-row items-center justify-between mb-4">
				<Text className="text-lg font-semibold text-foreground">{title}</Text>
				{showAddButton && (
					<Pressable
						className="h-8 w-8 items-center justify-center rounded-full bg-foreground"
						onPress={onAddPress}
					>
						<StyledIonicons className="text-background" name="add" size={16} />
					</Pressable>
				)}
			</View>
			{children}
		</View>
	);
}
