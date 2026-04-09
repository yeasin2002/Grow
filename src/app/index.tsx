import {
	IconCircleCheck,
	IconClockHour1,
	IconRotate2,
} from "@tabler/icons-react-native";
import { Tabs } from "heroui-native";
import { useState } from "react";
import { BottomNavigation } from "@/feature/homepage/bottom-navigation";
import { Container } from "@/feature/homepage/container";
import { GreetingHeader } from "@/feature/homepage/greeting-header";
import { ProgressSection } from "@/feature/homepage/progress-section";
import { TaskList } from "@/feature/homepage/task-list";
import { WeekCalendar } from "@/feature/homepage/week-calendar";

export default function HomePage() {
	const [activeTab, setActiveTab] = useState("todo");
	const [activeNavTab, setActiveNavTab] = useState("home");

	const StatusTabs = [
		{ id: "todo", label: "To do", icon: IconRotate2 },
		{ id: "completed", label: "Completed", icon: IconCircleCheck },
		{ id: "pending", label: "Pending", icon: IconClockHour1 },
	] as const;

	return (
		<Container className="pb-20 bg-background">
			{/* Greeting Header */}
			<GreetingHeader name="Yeasin" message="Let's Make Progress Today !" />
			<WeekCalendar selectedDate={10} />
			{/* Progress Section */}
			<ProgressSection
				title="Today's Progress"
				subtitle="Morning (English Literature)"
				completed={0}
				total={4}
			/>

			{/* Task Filter Tabs */}
			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="p-1 rounded-full mx-4"
			>
				<Tabs.List className="flex-row bg-[#E6E6E6]   rounded-full py-2 px-2 gap-0!">
					{StatusTabs.map((task) => {
						const isActive = activeTab === task.id;
						return (
							<Tabs.Trigger
								key={task.id}
								value={task.id}
								className={`flex-row items-center px-4 py-2 rounded-full  ${
									isActive ? "bg-black" : "bg-transparent"
								}`}
							>
								<task.icon color={isActive ? "#fff" : "#000"} />
								<Tabs.Label
									className={`text-sm font-medium ml-1 ${isActive ? "text-white" : "text-gray-400"}`}
								>
									{task.label}
								</Tabs.Label>
							</Tabs.Trigger>
						);
					})}
				</Tabs.List>

				{StatusTabs.map((task) => {
					return (
						<Tabs.Content key={task.id} value={task.id} className="mt-6">
							<TaskList />
						</Tabs.Content>
					);
				})}
			</Tabs>

			{/* Bottom Navigation */}
			<BottomNavigation
				activeTab={activeNavTab}
				onTabChange={setActiveNavTab}
			/>
		</Container>
	);
}
