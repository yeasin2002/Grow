import { useState } from "react";
import { DateSection } from "./date-section";
import { RoutineCard } from "./routine-card";
import { TaskItem } from "./task-item";

export const TaskList = () => {
  const [expandedRoutines, setExpandedRoutines] = useState<Record<string, boolean>>({
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
    <>
      {/* Today's Routines - Wed, 10 */}
      <DateSection title="Wed, 10">
        <RoutineCard
          title="Morning"
          isExpanded={expandedRoutines.morning ?? false}
          onToggle={() => toggleRoutine("morning")}
        >
          <TaskItem title="English Literature" timeRange="11:00 AM - 12:30 AM" />
        </RoutineCard>

        <RoutineCard
          title="Noon"
          isExpanded={expandedRoutines.noon ?? false}
          onToggle={() => toggleRoutine("noon")}
        >
          <TaskItem title="English Literature" timeRange="11:00 AM - 12:30 AM" />
        </RoutineCard>

        <RoutineCard
          title="Evening"
          isExpanded={expandedRoutines.evening ?? false}
          onToggle={() => toggleRoutine("evening")}
        >
          <TaskItem title="English Literature" timeRange="11:00 AM - 12:30 AM" />
        </RoutineCard>

        <RoutineCard
          title="Night"
          isExpanded={expandedRoutines.night ?? false}
          onToggle={() => toggleRoutine("night")}
        >
          <TaskItem title="English Literature" timeRange="11:00 AM - 12:30 AM" />
        </RoutineCard>
      </DateSection>

      {/* Future Routines - Thu, 11 - Sat, 13 */}
      <DateSection title="Thu, 11 - Sat, 13" showAddButton={true} onAddPress={() => {}}>
        <RoutineCard title="Linguistics" isExpanded={false} onToggle={() => {}} />
      </DateSection>
    </>
  );
};
