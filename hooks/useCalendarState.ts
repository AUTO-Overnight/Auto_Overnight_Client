import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RULES } from "../constants/rules";

type MarkedDate = {
  selected?: boolean;
  disabled?: boolean;
  selectedColor?: string;
  textColor?: string;
};

type MarkedDates = {
  [date: string]: MarkedDate;
};

const useCalendarState = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<string | null>(null);
  const [dragEnd, setDragEnd] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [datesToMark, setDatesToMark] = useState<MarkedDates>({});

  useEffect(() => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + RULES.availableToSelect.max);
    const newDatesToMark: MarkedDates = {};

    for (let d = today; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split("T")[0];
      newDatesToMark[dateString] = { selected: false };
    }

    setDatesToMark(newDatesToMark);
  }, []);

  const toggleDragMode = () => {
    setDragMode(!dragMode);
  };

  const handleDaySelect = (day: { dateString: string }) => {
    if (!datesToMark[day.dateString]) {
      Alert.alert("알림", "신청할 수 없는 날짜입니다.");
      return;
    }
    if (!selectedDates.includes(day.dateString)) {
      setSelectedDates([...selectedDates, day.dateString].sort());
    } else {
      setSelectedDates(selectedDates.filter((date) => date !== day.dateString));
    }
  };

  const handleDragSelect = (day: { dateString: string }) => {
    if (!datesToMark[day.dateString]) {
      Alert.alert("알림", "신청할 수 없는 날짜입니다.");
      return;
    }
    if (!dragStart) {
      setDragStart(day.dateString);
    } else if (!dragEnd) {
      setDragEnd(day.dateString);
      selectDateRange(dragStart, day.dateString);
      setDragStart(null);
      setDragEnd(null);
    }
  };

  const selectDateRange = (startDate: string, endDate: string): void => {
    let start = new Date(startDate);
    let end = new Date(endDate);

    if (start > end) {
      [start, end] = [end, start];
    }

    const newSelected = new Set(selectedDates);

    // for문을 사용하여 날짜 범위 내의 모든 날짜 추가
    for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
      newSelected.add(day.toISOString().split("T")[0]);
    }

    setSelectedDates(Array.from(newSelected).sort());
  };

  const handleTodayPress = () => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  };

  const handleMonthChange = (monthInfo: { year: number; month: number }) => {
    const { year, month } = monthInfo;
    // 달(month)은 1 기반으로 계산되므로, 0-11 범위를 가지는 JavaScript 날짜에서 사용하기 위해 1을 빼줍니다.
    const newDate = new Date(year, month - 1, 2).toISOString().split("T")[0];
    setCurrentDate(newDate);
  };

  const getMarkedDates = (): MarkedDates => {
    const marked: MarkedDates = {};

    for (const date in datesToMark) {
      marked[date] = { ...datesToMark[date] };
    }

    // 선택된 날짜에 특별한 스타일 적용
    selectedDates.forEach((date) => {
      if (marked[date]) {
        marked[date] = {
          ...marked[date],
          selected: true,
          selectedColor: "blue",
        };
      }
    });

    return marked;
  };

  return {
    selectedDates,
    setSelectedDates,
    setCurrentDate,
    datesToMark,
    dragMode,
    toggleDragMode,
    dragStart,
    currentDate,
    getMarkedDates,
    handleDaySelect,
    handleDragSelect,
    handleTodayPress,
    handleMonthChange,
  };
};

export default useCalendarState;
