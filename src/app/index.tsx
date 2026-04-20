import { useState } from "react";
import { BottomNavigation } from "@/feature/homepage/bottom-navigation";
import { Container } from "@/feature/homepage/container";
import { GreetingHeader } from "@/feature/homepage/greeting-header";
import { ProgressSection } from "@/feature/homepage/progress-section";
import { TaskFilterTabs } from "@/feature/homepage/task-filter-tabs";
import { WeekCalendar } from "@/feature/homepage/week-calendar";

export default function HomePage() {
	const [activeNavTab, setActiveNavTab] = useState("home");

	return (
		<Container className="pb-20 bg-background">
			{/* Greeting Header */}
			<GreetingHeader name="Yeasin" message="Let's Make Progress Today !" />
			<WeekCalendar selectedDate={10} />
			<ProgressSection />
			<TaskFilterTabs />

			<BottomNavigation
				activeTab={activeNavTab}
				onTabChange={setActiveNavTab}
			/>
		</Container>
	);
}
