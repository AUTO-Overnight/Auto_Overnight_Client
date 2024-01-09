import { StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH } from '../../../constants/style';
import useCalendarState from './hooks';
import { useState } from 'react';
import ConfirmOvernightDatesModal from './modal/ConfirmOvernightDatesModal';
import { useModeStore } from '../../../store/mode';
import SelectHelper from './components/SelectHelper';
import CalendarView from './components/Calendar';
import ModeSelector from './components/ModeSelector';
import SelectionButtonGroup from './components/SelectionButtonGroup';
import SubmitButton from './components/SubmitButton';

const ButtonContainer = ({
  onReset,
  onTodayPress,
  selectionMode,
  setSelectionMode,
  onSubmit,
  selectedDates,
}: any) => (
  <View style={styles.buttonContainer}>
    <SelectionButtonGroup onReset={onReset} onTodayPress={onTodayPress} />
    <ModeSelector
      selectionMode={selectionMode}
      setSelectionMode={setSelectionMode}
    />
    <SubmitButton onSubmit={onSubmit} disabled={selectedDates.length === 0} />
  </View>
);

const resetSelectedDates = (setSelectedDates: any) => {
  return () => setSelectedDates([]);
};

const MainTab = () => {
  const { isDarkMode } = useModeStore(); // Zustand 스토어에서 toggleMode 가져오기

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: SCREEN_WIDTH,
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
    buttonContainer: {
      flex: 4,
      justifyContent: 'space-between',
    },
    modalView: {
      margin: 20,
      backgroundColor: isDarkMode ? '#333333' : 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    dateText: {
      backgroundColor: isDarkMode ? '#FFA500' : 'orange',
      marginHorizontal: 5,
      marginBottom: 10,
    },
    // 기타 스타일 정의
  });

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

  const handleResetSelectedDates = resetSelectedDates(setSelectedDates);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectionMode, setSelectionMode] = useState('single');

  const closeModal = () => {
    setSelectedDates([]);
    getMarkedDates();
    setIsModalVisible(false);
  };

  const _dayPressHandler =
    selectionMode === 'multiple' ? handleDragSelect : handleDaySelect;

  const markedDates = getMarkedDates();

  const handleApplyPress = () => {
    setIsModalVisible(true);
  };

  const instructions =
    selectionMode === 'multiple'
      ? dragStart
        ? '다중 선택 모드, 종료일을 선택해주세요'
        : '다중 선택 모드, 시작일을 선택해주세요'
      : '단일 선택 모드, 1일씩 선택해주세요';

  return (
    <View style={dynamicStyles.container}>
      <SelectHelper text={instructions} />
      <CalendarView
        onDayPress={_dayPressHandler}
        currentDate={currentDate}
        markedDates={markedDates}
        onMonthChange={handleMonthChange}
      />
      <ButtonContainer
        onReset={handleResetSelectedDates}
        onTodayPress={handleTodayPress}
        selectionMode={selectionMode}
        setSelectionMode={setSelectionMode}
        onSubmit={handleApplyPress}
        selectedDates={selectedDates}
      />
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
    justifyContent: 'space-between',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    textAlign: 'center',
  },
  dateText: {
    backgroundColor: 'orange',
    marginHorizontal: 5,
    marginBottom: 10,
  },
});
