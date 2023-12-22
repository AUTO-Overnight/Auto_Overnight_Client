import { useState } from "react";

const useCalendarState = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<string | null>(null);
  const [dragEnd, setDragEnd] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const toggleDragMode = () => {
    setDragMode(!dragMode);
  };

  const handleDaySelect = (day: any) => {
    if (!selectedDates.includes(day.dateString)) {
      setSelectedDates([...selectedDates, day.dateString].sort());
    } else {
      setSelectedDates(selectedDates.filter((date) => date !== day.dateString));
    }
  };

  const handleDragSelect = (day: any) => {
    if (!dragStart) {
      setDragStart(day.dateString);
    } else if (!dragEnd) {
      setDragEnd(day.dateString);
      selectDateRange(dragStart, day.dateString);
      setDragStart(null);
      setDragEnd(null);
    }
  };

  const selectDateRange = (startDate: string, endDate: string) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let day = start;
    const newSelected = new Set(selectedDates);

    while (day <= end) {
      newSelected.add(day.toISOString().split("T")[0]);
      day = new Date(day.setDate(day.getDate() + 1));
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
    const newDate = new Date(year, month - 1, 1).toISOString().split("T")[0];
    setCurrentDate(newDate);
    console.log("Current date updated to: ", newDate);
  };

  return {
    selectedDates,
    setSelectedDates,
    dragMode,
    toggleDragMode,
    dragStart,
    currentDate,
    handleDaySelect,
    handleDragSelect,
    handleTodayPress,
    handleMonthChange,
  };
};

export default useCalendarState;
