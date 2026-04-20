import { View } from "react-native";
import { BottomNavigation } from "@/feature/homepage/bottom-navigation";
import { Container } from "@/feature/homepage/container";
import { GreetingHeader } from "@/feature/homepage/greeting-header";
import { ProgressSection } from "@/feature/homepage/progress-section";
import { TaskFilterTabs } from "@/feature/homepage/task-filter-tabs";
import { WeekCalendar } from "@/feature/homepage/week-calendar";

export default function HomePage() {
	return (
		<View className="flex-1 bg-background">
			<Container className="bg-background">
				<View className="pb-32">
					<GreetingHeader name="Yeasin" message="Let's Make Progress Today !" />
					<WeekCalendar selectedDate={10} />
					<ProgressSection />
					<TaskFilterTabs />
				</View>
			</Container>

			<View className="absolute bottom-5 left-0 right-0">
				<BottomNavigation />
			</View>
		</View>
	);
}
