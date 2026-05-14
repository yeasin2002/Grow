import { Container } from "@/feature/homepage/container";
import { GreetingHeader } from "@/feature/homepage/greeting-header";
import { ProgressSection } from "@/feature/homepage/progress-section";
import { TaskFilterTabs } from "@/feature/homepage/task-filter-tabs";
import { WeekCalendar } from "@/feature/homepage/week-calendar";

export default function HomePage() {
	return (
    <Container className="bg-background">
      <GreetingHeader name="Kawsar" message="Let's Make Progress Today !" />
      <WeekCalendar selectedDate={10} />
      <ProgressSection />
      <TaskFilterTabs />
    </Container>
  );
}
