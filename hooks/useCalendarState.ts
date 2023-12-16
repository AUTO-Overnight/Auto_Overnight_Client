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

  return {
    selectedDates,
    setSelectedDates,
    dragMode,
    toggleDragMode,
    dragStart,
    currentDate,
    setCurrentDate,
    handleDaySelect,
    handleDragSelect,
    handleTodayPress,
  };
};

export default useCalendarState;
