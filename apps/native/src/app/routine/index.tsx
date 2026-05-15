import { Link } from "expo-router";
import { Text, View } from "react-native";

import { Container } from "@/feature/homepage/container";

const Routine = () => {
	return (
		<Container className="bg-[#f4f4f4]" isScrollable={false}>
			<View className="flex-1 px-6 pt-10">
				<Text className="text-2xl font-semibold text-[#111111]">Routine</Text>
				<Link
					href="/routine/create-routine"
					className="mt-4 text-base text-[#111111]"
				>
					Create Routine
				</Link>
			</View>
		</Container>
	);
};

export default Routine;
