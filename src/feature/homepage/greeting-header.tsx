import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { withUniwind } from "uniwind";

const StyledIonicons = withUniwind(Ionicons);

interface GreetingHeaderProps {
	name: string;
	message: string;
}

export function GreetingHeader({ name, message }: GreetingHeaderProps) {
	return (
		<View className="flex-row items-center justify-between px-6 pt-14 pb-6">
			<View className="flex-1">
				<Text className="text-lg text-default-500">Hey {name} 👋</Text>
				<Text className="text-xl font-semibold text-foreground mt-1">
					{message}
				</Text>
			</View>
			<View className="h-12 w-12 items-center justify-center rounded-full bg-foreground">
				<StyledIonicons className="text-background" name="flame" size={24} />
			</View>
		</View>
	);
}
