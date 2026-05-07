import { Input } from "heroui-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Icons } from "@/lib";

export function NotesSearchRow() {
  return (
    <View className="mt-8 flex-row items-center gap-2">
      <Input placeholder="Find any note or documents" style={Styles.input} />
      <Pressable style={Styles.button}>
        <Icons className="text-white" name="add" size={34} />
      </Pressable>
    </View>
  );
}

const Styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: "transparent",
    paddingVertical: 32,
    minHeight: 48,
    paddingLeft: 8,
  },

  button: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#000",
  },
});
