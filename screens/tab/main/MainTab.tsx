import { StyleSheet, View, Text } from "react-native";
import { SCREEN_WIDTH } from "../../../constants/style";
import CustomButton from "../../../components/global/CustomButton";
import useCalendarState from "../../../hooks/useCalendarState";
import { useState } from "react";
import ConfirmOvernightDatesModal from "../../../components/modal/ConfirmOvernightDatesModal";
import { useStore } from "../../../store/store";
import Helper from "./components/Helper";
import CalendarView from "./components/Calendar";
import ModeSelector from "./components/ModeSelector";

const ButtonContainer = ({
  onReset,
  onTodayPress,
  selectionMode,
  setSelectionMode,
  onSubmit,
}: any) => (
  <View style={styles.buttonContainer}>
    <View style={styles.buttonView}>
      <CustomButton
        title='초기화'
        onPress={onReset}
        titleColor='#1860B4'
        buttonColor='none'
        iconName='refresh'
        iconColor='#1860B4'
      />
      <CustomButton
        title='오늘 날짜 보기'
        onPress={onTodayPress}
        titleColor='#1860B4'
        buttonColor='none'
      />
    </View>
    <ModeSelector
      selectionMode={selectionMode}
      setSelectionMode={setSelectionMode}
    />
    <View style={styles.submitView}>
      <CustomButton title='신청하기' onPress={onSubmit} flex={1} />
    </View>
  </View>
);

const MainTab = () => {
  // 이런 느낌으로 다크모드/라이트모드에 따라 스타일을 동적으로 변경할 수 있습니다.
  // const { isDarkMode } = useStore(); // Zustand 스토어에서 toggleMode 가져오기

  // const dynamicStyles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     width: SCREEN_WIDTH,
  //     backgroundColor: isDarkMode ? "#000" : "#fff", // 다크모드에 따른 배경색 변경
  //   },
  //   text: {
  //     color: isDarkMode ? "#fff" : "#000", // 다크모드에 따른 텍스트 색상 변경
  //   },
  //   // ... 기타 스타일
  // });

  const {
    selectedDates,
    setSelectedDates,
    dragStart,
    currentDate,
    getMarkedDates,
    handleDaySelect,
    handleDragSelect,
    handleTodayPress,
    handleMonthChange,
  } = useCalendarState();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectionMode, setSelectionMode] = useState("single");

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const _dayPressHandler =
    selectionMode === "multiple" ? handleDragSelect : handleDaySelect;

  const markedDates = getMarkedDates();

  const handleApplyPress = () => {
    setIsModalVisible(true);
  };

  const instructions =
    selectionMode === "multiple"
      ? dragStart
        ? "다중 선택 모드, 종료일을 선택해주세요"
        : "다중 선택 모드, 시작일을 선택해주세요"
      : "단일 선택 모드, 1일씩 선택해주세요";

  return (
    <View style={styles.container}>
      <Helper text={instructions} />
      <CalendarView
        onDayPress={_dayPressHandler}
        currentDate={currentDate}
        markedDates={markedDates}
        onMonthChange={handleMonthChange}
      />
      {/* 달력 하단 버튼 모음 */}
      <ButtonContainer
        onReset={() => setSelectedDates([])}
        onTodayPress={handleTodayPress}
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        onSubmit={handleApplyPress}
      />
      {/* 신청하기 버튼 상호작용 모달 */}
      <ConfirmOvernightDatesModal
        selectedDates={selectedDates}
        isModalVisible={isModalVisible}
        closeModal={closeModal}
      />
    </View>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  buttonContainer: {
    flex: 4,
    justifyContent: "space-between",
  },
  buttonView: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "flex-start",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dateText: {
    backgroundColor: "orange",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  submitView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});