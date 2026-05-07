import { cn } from "heroui-native";
import { Text, View } from "react-native";

interface WeekCalendarProps {
  selectedDate?: number;
}

export function WeekCalendar({ selectedDate = 10 }: WeekCalendarProps) {
  const weekDays = [
    { day: "Mon", date: 8 },
    { day: "Tue", date: 9 },
    { day: "Wed", date: 10 },
    { day: "Thu", date: 11 },
    { day: "Fri", date: 12 },
    { day: "Sat", date: 13 },
  ];

  return (
    <View
      className="px-6 mb-6 bg-[#F9F9F9] rounded-2xl mx-4 "
      style={{ boxShadow: "0px 5px 8px 0px #0000000D" }}
    >
      <View className="flex-row justify-between text-black">
        {weekDays.map((item) => (
          <View
            key={item.date}
            className={cn(
              "items-center py-1 my-2",
              item.date === selectedDate
                ? "bg-[#F2F2F2] border border-[#EBEBEB] rounded-lg"
                : "bg-transparent",
            )}
          >
            <Text className="text-sm text-default-400 ">{item.day}</Text>
            <View className={`h-7 w-10 items-center justify-center rounded-full `}>
              <Text
                className={`text-base font-medium ${
                  item.date === selectedDate ? "text-default-400" : "text-default-100"
                }`}
              >
                {item.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
