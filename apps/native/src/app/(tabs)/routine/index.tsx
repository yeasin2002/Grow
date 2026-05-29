import { Container } from "@/components/homepage/container";
import {
	RoutineTimeline,
	type RoutineTimelineEntry,
} from "@/components/routine/routine-timeline";
import { PageHero } from "@/components/shared/index";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DEMO_ROUTINES: RoutineTimelineEntry[] = [
	{
		id: "english-linguistics",
		type: "class",
		timeLabel: "11:00 AM - 11:45 AM",
		title: "English Linguistics",
		primaryDetail: "Class 12",
		secondaryDetail: "Thursday - 11:00 AM - 12:30 AM",
	},
	{
		id: "science",
		type: "class",
		timeLabel: "2:00 PM - 3:30 PM",
		title: "Science",
		primaryDetail: "Thursday - Ground 1",
		secondaryDetail: "",
	},
	{
		id: "logic",
		type: "class",
		timeLabel: "3:00 PM - 3:45 PM",
		title: "Logic",
		primaryDetail: "Thursday - Ground 1",
		secondaryDetail: "",
	},
	{
		id: "break-1",
		type: "break",
		label: "Break 3:45 PM - 4:30 PM",
	},
] as const;

const Routine = () => {
	const insets = useSafeAreaInsets();
	return (
		<Container className="bg-[#f4f4f4]" isScrollable={false}>
			<ScrollView
				bounces={false}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="never"
				contentInset={{ bottom: Math.max(insets.bottom + 24, 32) }}
				style={{ paddingTop: insets.top + 18 }}
				contentContainerStyle={{ paddingHorizontal: 14 }}
			>
				<PageHero
					title="Routine"
					subtitle={`${DEMO_ROUTINES.filter((item) => item.type === "class").length} routine`}
				/>

				<Button
					className="max-w-60  bg-black mx-auto mt-4 rounded-xl"
					onPress={() => router.push("/routine/create-routine")}
				>
					<AntDesign name="plus" size={18} color="white" />
					<Text className="text-white">Create Routine </Text>
				</Button>

				<RoutineTimeline entries={DEMO_ROUTINES} />
			</ScrollView>
		</Container>
	);
};

export default Routine;
