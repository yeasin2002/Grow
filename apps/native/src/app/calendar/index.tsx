import { MonthlyCalendar } from "@/feature/calender/display-calendar";
import { Container } from "@/feature/homepage/container";
import { TaskFilterTabs } from "@/feature/homepage/task-filter-tabs";

const Calender = () => {
	return (
		<Container className="bg-[#F2F2F2]">
			<MonthlyCalendar />

			<TaskFilterTabs />
		</Container>
	);
};

export default Calender;
