import { StyleSheet, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";

// TODO: selectionMode, setSelectionMode 타입 정의
const ModeSelector = ({ selectionMode, setSelectionMode }: any) => (
  <View style={styles.modeSelector}>
    <SegmentedButtons
      value={selectionMode}
      onValueChange={setSelectionMode}
      buttons={[
        { label: "단일 선택", value: "single" },
        { label: "다중 선택", value: "multiple" },
      ]}
    />
  </View>
);

export default ModeSelector;

const styles = StyleSheet.create({
  modeSelector: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
