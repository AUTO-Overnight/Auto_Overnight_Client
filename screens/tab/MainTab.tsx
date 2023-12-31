import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import { SCREEN_WIDTH } from "../../constants/style";
import { Calendar } from "react-native-calendars";
import CustomButton from "../../components/global/CustomButton";
import useCalendarState from "../../hooks/useCalendarState";
import { useState } from "react";

const MainTab = () => {
  const {
    selectedDates,
    setSelectedDates,
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleApplyPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const _dayPressHandler = dragMode ? handleDragSelect : handleDaySelect;

  const markedDates = getMarkedDates();

  const instructions = dragMode
    ? dragStart
      ? "다중 선택 모드, 종료일을 선택해주세요"
      : "다중 선택 모드, 시작일을 선택해주세요"
    : "일반 선택 모드, 1일씩 선택해주세요";

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
      <View style={styles.buttonView}>
        <CustomButton
          title='선택 전체 취소'
          onPress={() => setSelectedDates([])}
        />
        <CustomButton title='오늘 날짜 보기' onPress={handleTodayPress} />
        <CustomButton title='외박 신청' onPress={handleApplyPress} />
      </View>
      <View style={styles.modeView}>
        <Text>{instructions}</Text>
      </View>
      <View style={styles.modeSelector}>
        <CustomButton title={"선택 모드 변경"} onPress={toggleDragMode} />
      </View>
      {/* 모달 */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>해당 날짜에 신청하시겠습니까?</Text>
          <ScrollView>
            {selectedDates.map((date) => (
              <Text key={date} style={styles.dateText}>
                {date}
              </Text>
            ))}
          </ScrollView>
          <Button title='확인' onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
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
});
