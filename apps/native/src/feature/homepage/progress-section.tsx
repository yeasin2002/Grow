import { cn, Slider } from "heroui-native";
import { Text, View } from "react-native";

const COMPLETED = 0;
const TOTAL = 0;
// const progressPercentage = 20;

export function ProgressSection() {
  return (
    <View className="mx-4 mb-6 bg-content1 p-4 bg-[#F4FAF6] rounded-2xl!">
      <Text className="text-lg font-semibold  mb-1 text-black">Today's Progress</Text>
      <View className="flex-row items-center mb-3">
        <View className="h-2 w-2 rounded-full bg-success mr-2" />
        <View className="text-sm flex flex-row gap-x-1 items-end">
          <Text className="text-success">Morning</Text>
          <Text className="text-xs text-gray-600">(English Literature)</Text>
        </View>
      </View>

      <View className="mb-3">
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-sm text-black">Routines completed</Text>
          <Text className="text-sm font-medium text-black">
            {COMPLETED} / {TOTAL}
          </Text>
        </View>
        <Slider defaultValue={65} className={cn(`w-[20%]`)}>
          <Slider.Track className="h-3 rounded-full bg-success/70">
            <Slider.Fill className="rounded-full bg-success" />
          </Slider.Track>
        </Slider>
      </View>
    </View>
  );
}
