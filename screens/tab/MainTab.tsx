import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import CustomButton from "../../components/global/CustomButton";

// 날짜에 적용될 스타일을 정의하는 타입
type MarkedDate = {
  selected: boolean;
  selectedColor: string;
};

// markedDates 객체의 타입
type MarkedDates = {
  [date: string]: MarkedDate;
};

const MainTab = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<string | null>(null);
  const [dragEnd, setDragEnd] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0] as string
  );

  const _handleToggleDragMode = () => {
    setDragMode(!dragMode);
  };

  const _handleDayPress = (day: any) => {
    if (!selected.includes(day.dateString)) {
      setSelected([...selected, day.dateString].sort());
    } else {
      setSelected(selected.filter((date) => date !== day.dateString));
    }
  };

  const _handleDragSelect = (day: any) => {
    if (!dragStart) {
      setDragStart(day.dateString);
    } else if (!dragEnd) {
      setDragEnd(day.dateString);
      selectDateRange(dragStart, day.dateString);
      setDragStart(null);
      setDragEnd(null);
    }
  };

  const dayPressHandler = dragMode ? _handleDragSelect : _handleDayPress;

  const selectDateRange = (startDate: string, endDate: string) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let day = start;
    const newSelected = new Set(selected);

    while (day <= end) {
      newSelected.add(day.toISOString().split("T")[0]);
      day = new Date(day.setDate(day.getDate() + 1));
    }

    setSelected(Array.from(newSelected).sort());
  };

  const _handleTodayPress = () => {
    setCurrentDate(new Date().toISOString().split("T")[0]);
  };

  const markedDates: MarkedDates = selected.reduce(
    (acc: MarkedDates, curr: string) => {
      acc[curr] = { selected: true, selectedColor: "blue" };
      return acc;
    },
    {}
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={dayPressHandler}
        current={currentDate}
        markedDates={markedDates}
      />
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
        <CustomButton title='선택 전체 취소' onPress={() => setSelected([])} />
        <CustomButton title='오늘 날짜 보기' onPress={_handleTodayPress} />
        <CustomButton title='외박 신청' />
      </View>
      <View style={styles.modeView}>
        <Text>
          {dragMode
            ? dragStart
              ? "다중 선택 모드, 종료일을 선택해주세요"
              : "다중 선택 모드, 시작일을 선택해주세요"
            : "일반 선택 모드, 1일씩 선택해주세요"}
        </Text>
      </View>
      <View style={styles.modeSelector}>
        <CustomButton
          title={"선택 모드 변경"}
          onPress={_handleToggleDragMode}
        />
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
