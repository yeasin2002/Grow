import { FlashCalendar } from "@/components/calender/flash-calendar";
import { Container } from "@/components/homepage/container";
import { TaskFilterTabs } from "@/components/homepage/task-filter-tabs";
import { useState } from "react";

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
