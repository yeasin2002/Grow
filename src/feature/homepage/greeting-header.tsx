import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Icons } from "@/lib";

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

			<Pressable
				onPress={() => router.push("/notifications")}
				className="h-12 w-12 items-center justify-center rounded-2xl bg-foreground"
			>
				<Icons className="text-background" name="notifications" size={24} />
			</Pressable>
		</View>
	);
}
