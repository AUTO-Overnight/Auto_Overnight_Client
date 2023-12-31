import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";
import { Calendar } from "react-native-calendars";
import CustomButton from "../../components/global/CustomButton";
import useCalendarState from "../../hooks/useCalendarState";
import { useEffect } from "react";

const MainTab = () => {
  const {
    selectedDates,
    setSelectedDates,
    setCurrentDate,
    dragMode,
    toggleDragMode,
    dragStart,
    currentDate,
    getMarkedDates,
    handleDaySelect,
    handleDragSelect,
    handleTodayPress,
    handleMonthChange,
  } = useCalendarState();

  const _dayPressHandler = dragMode ? handleDragSelect : handleDaySelect;

  const markedDates = getMarkedDates();

  const instructions = dragMode
    ? dragStart
      ? "다중 선택 모드, 종료일을 선택해주세요"
      : "다중 선택 모드, 시작일을 선택해주세요"
    : "일반 선택 모드, 1일씩 선택해주세요";

  useEffect(() => {
    console.log("currentDate changed!", currentDate);
  }, [currentDate]);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={_dayPressHandler}
        key={currentDate}
        current={currentDate}
        markedDates={markedDates}
        showSixWeeks
        enableSwipeMonths
        onMonthChange={handleMonthChange}
      />
      <View style={styles.selectedDays}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}>
          {selectedDates.map((date) => (
            <Text
              key={date}
              style={{ backgroundColor: "orange", marginHorizontal: 5 }}>
              {date}
            </Text>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          title='선택 전체 취소'
          onPress={() => setSelectedDates([])}
        />
        <CustomButton title='오늘 날짜 보기' onPress={handleTodayPress} />
        <CustomButton title='외박 신청' />
      </View>
      <View style={styles.modeView}>
        <Text>{instructions}</Text>
      </View>
      <View style={styles.modeSelector}>
        <CustomButton title={"선택 모드 변경"} onPress={toggleDragMode} />
      </View>
    </View>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  selectedDays: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonView: {
    flex: 1,
    gap: 10,
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
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
