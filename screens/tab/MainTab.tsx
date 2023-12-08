import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";
import { Calendar } from "react-native-calendars";
import { useState } from "react";

const MainTab = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [daysMode, setDaysMode] = useState<number>(1);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const _handleDayPress = (day: any) => {
    if (!selected.includes(day.dateString)) {
      setSelected([...selected, day.dateString].sort());
    } else {
      setSelected(selected.filter((date) => date !== day.dateString));
    }
  };

  const _handleModeChange = (mode: number) => {
    setDaysMode(mode);
  };

  const _handleTodayPress = () => {
    setCurrentDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <View style={styles.content}>
      <Calendar onDayPress={_handleDayPress} current={currentDate} />
      <View style={styles.selectedDays}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}>
          {selected.map((date) => (
            <Text
              key={date}
              style={{ backgroundColor: "orange", marginHorizontal: 5 }}>
              {date}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonView}>
        <Button title='선택 전체 취소' onPress={() => setSelected([])} />
        <Button title='오늘 날짜 보기' onPress={_handleTodayPress} />
        <Button title='외박 신청' />
      </View>
      <View style={styles.modeView}>
        <Text>{daysMode}일씩 신청하기</Text>
      </View>
      <View style={styles.modeSelector}>
        <Button title='1 day' onPress={() => _handleModeChange(1)} />
        <Button title='1 week' onPress={() => _handleModeChange(7)} />
        <Button title='2 weeks' onPress={() => _handleModeChange(14)} />
        <Button title='4 weeks' onPress={() => _handleModeChange(28)} />
      </View>
    </View>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: SCREEN_WIDTH,
  },
  content: {
    flex: 8,
    width: SCREEN_WIDTH,
  },
  selectedDays: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  modeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
  },
  modeSelector: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottom: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: "flex-end",
    backgroundColor: "purple",
  },
});
