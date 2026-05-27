import { useState } from "react";
import { FlashCalendar } from "@/feature/calender/flash-calendar";
import { Container } from "@/feature/homepage/container";
import { TaskFilterTabs } from "@/feature/homepage/task-filter-tabs";

const Calender = () => {
	const [, setSelectedDate] = useState(() => new Date());

	return (
		<Container className="bg-[#F2F2F2] pt-6">
			<FlashCalendar onDateChange={setSelectedDate} />
			<TaskFilterTabs />
		</Container>
	);
};

export default Calender;
