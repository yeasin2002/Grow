import { Container } from "@/components/homepage/container";
import { GreetingHeader } from "@/components/homepage/greeting-header";
import { ProgressSection } from "@/components/homepage/progress-section";
import { TaskFilterTabs } from "@/components/homepage/task-filter-tabs";
import { WeekCalendar } from "@/components/homepage/week-calendar";

export default function HomePage() {
	return (
		<Container className="bg-background">
			<GreetingHeader name="Yeasin" message="Let's Make Progress Today !" />
			<WeekCalendar selectedDate={10} />
			<ProgressSection />
			<TaskFilterTabs />
		</Container>
	);
}
