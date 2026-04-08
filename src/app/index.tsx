import { useState } from "react";

import { BottomNavigation } from "@/components/bottom-navigation";
import { Container } from "@/components/container";
import { DateSection } from "@/components/date-section";
import { GreetingHeader } from "@/components/greeting-header";
import { ProgressSection } from "@/components/progress-section";
import { RoutineCard } from "@/components/routine-card";
import { TaskFilterTabs } from "@/components/task-filter-tabs";
import { TaskItem } from "@/components/task-item";
import { WeekCalendar } from "@/components/week-calendar";

export default function HomePage() {
	const [activeTab, setActiveTab] = useState<"todo" | "completed" | "pending">(
		"todo",
	);
	const [activeNavTab, setActiveNavTab] = useState("home");
	const [expandedRoutines, setExpandedRoutines] = useState<
		Record<string, boolean>
	>({
		morning: true,
		noon: false,
		evening: false,
		night: false,
	});

	const toggleRoutine = (routineId: string) => {
		setExpandedRoutines((prev) => ({
			...prev,
			[routineId]: !prev[routineId],
		}));
	};

	return (
		<Container className="pb-20">
			{/* Greeting Header */}
			<GreetingHeader name="Asif" message="Let's Make Progress Today !" />

			{/* Week Calendar */}
			<WeekCalendar selectedDate={10} />

			{/* Progress Section */}
			<ProgressSection
				title="Today's Progress"
				subtitle="Morning (English Literature)"
				completed={0}
				total={4}
			/>

			{/* Task Filter Tabs */}
			<TaskFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

			{/* Today's Routines - Wed, 10 */}
			<DateSection title="Wed, 10">
				<RoutineCard
					title="Morning"
					isExpanded={expandedRoutines.morning ?? false}
					onToggle={() => toggleRoutine("morning")}
				>
					<TaskItem
						title="English Literature"
						timeRange="11:00 AM - 12:30 AM"
					/>
				</RoutineCard>

				<RoutineCard
					title="Noon"
					isExpanded={expandedRoutines.noon ?? false}
					onToggle={() => toggleRoutine("noon")}
				>
					<TaskItem
						title="English Literature"
						timeRange="11:00 AM - 12:30 AM"
					/>
				</RoutineCard>

				<RoutineCard
					title="Evening"
					isExpanded={expandedRoutines.evening ?? false}
					onToggle={() => toggleRoutine("evening")}
				>
					<TaskItem
						title="English Literature"
						timeRange="11:00 AM - 12:30 AM"
					/>
				</RoutineCard>

				<RoutineCard
					title="Night"
					isExpanded={expandedRoutines.night ?? false}
					onToggle={() => toggleRoutine("night")}
				>
					<TaskItem
						title="English Literature"
						timeRange="11:00 AM - 12:30 AM"
					/>
				</RoutineCard>
			</DateSection>

			{/* Future Routines - Thu, 11 - Sat, 13 */}
			<DateSection
				title="Thu, 11 - Sat, 13"
				showAddButton={true}
				onAddPress={() => {}}
			>
				<RoutineCard
					title="Linguistics"
					isExpanded={false}
					onToggle={() => {}}
				/>
			</DateSection>

			{/* Bottom Navigation */}
			<BottomNavigation
				activeTab={activeNavTab}
				onTabChange={setActiveNavTab}
			/>
		</Container>
	);
}
