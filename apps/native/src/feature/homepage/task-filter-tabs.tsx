import { TaskList } from "@/feature/homepage/task-list";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "heroui-native";
import { useState } from "react";

export const TaskFilterTabs = () => {
  const [activeTab, setActiveTab] = useState("todo");

  const StatusTabs = [
    { id: "todo", label: "To do", icon: "refresh" },
    { id: "completed", label: "Completed", icon: "checkmark-circle" },
    { id: "pending", label: "Pending", icon: "time-outline" },
  ] as const;

  return (
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
              className={`flex-row items-center px-2 py-2 rounded-full  ${
                isActive ? "bg-black" : "bg-transparent"
              }`}
            >
              <Ionicons
                name={task.icon}
                size={18}
                color={isActive ? "#fff" : "#000"}
              />
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
  );
};
