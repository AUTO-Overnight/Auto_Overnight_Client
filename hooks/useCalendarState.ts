import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { RULES } from "../constants/rules";
import { useUserStore } from "../store/login";
import { CALENDAR_COLORS } from "../constants/style";

type MarkedDate = {
  selected?: boolean;
  disabled?: boolean;
  selectedColor?: string;
  dotColor?: string;
  textColor?: string;
  marked?: boolean;
};

type MarkedDates = {
  [date: string]: MarkedDate;
};

const mockOutStayFrDt = ["20240105", "20240110", "20240115"];

const mockOutStayToDt = ["20240106", "20240112", "20240117"];

const mockOutStayStGbn = ["1", "2", "1"];

const useCalendarState = () => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [dragMode, setDragMode] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<string | null>(null);
  const [dragEnd, setDragEnd] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [datesToMark, setDatesToMark] = useState<MarkedDates>({});

  // 전역으로 저장되어있는 유저 정보 중 날짜 관련 정보를 가져옵니다.
  const { name, yy, tmGbn, outStayFrDt, outStayToDt, outStayStGbn } =
    useUserStore();

  // 날짜 관련 정보를 가공합니다.
  const convertDateFormat = (dates: string[]): string[] => {
    return dates.map((date) => {
      return `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(
        6,
        8
      )}`;
    });
  };

  // 날짜 관련 정보를 가공합니다.
  useEffect(() => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + RULES.availableToSelect.max);
    const newDatesToMark: MarkedDates = {};

    for (let d = today; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split("T")[0];
      newDatesToMark[dateString] = { selected: false };
    }

    // Mock 데이터를 사용하여 특정 날짜를 초록색으로 표시
    // const convertedOutStayFrDt = convertDateFormat(outStayFrDt);
    // const convertedOutStayToDt = convertDateFormat(outStayToDt);
    // 실제 데이터(상단) 테스트 데이터(하단)
    const convertedOutStayFrDt = convertDateFormat(mockOutStayFrDt);
    const convertedOutStayToDt = convertDateFormat(mockOutStayToDt);

    convertedOutStayFrDt.forEach((startDate, index) => {
      const endDate = convertedOutStayToDt[index];
      // const outStayGbn = outStayStGbn[index];
      // 실제 데이터(상단) 테스트 데이터(하단)
      const outStayGbn = mockOutStayStGbn[index]; // 승인 상태
      let start = new Date(startDate);
      let end = new Date(endDate);

      for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
        const dayString = day.toISOString().split("T")[0];
        newDatesToMark[dayString] = {
          // selected: true, -> selected는 원형으로 색상을 표시하는 것이므로, selected를 사용하지 않습니다.
          dotColor:
            outStayGbn === "2"
              ? CALENDAR_COLORS.completed
              : CALENDAR_COLORS.outstanding, // 승인 상태에 따라 점의 색상 결정
          marked: true, // 달력에 점 표시를 활성화
        };
      }
    });

    setDatesToMark(newDatesToMark);
  }, []);

  const toggleDragMode = () => {
    setDragMode(!dragMode);
  };

  const handleDaySelect = (day: { dateString: string }) => {
    // datesToMark에 날짜가 없는 경우 알림 처리
    if (!datesToMark[day.dateString]) {
      Alert.alert("알림", "신청할 수 없는 날짜입니다.");
      return;
    }
    // datesToMark에 날짜가 있고, dotColor가 설정된 경우 알림 처리
    // 여기서 미승인 = 신청 완료되고 승인 대기중인 상태
    const mark = datesToMark[day.dateString];
    if (mark && mark.marked) {
      if (mark.dotColor === CALENDAR_COLORS.completed) {
        Alert.alert("알림", "이미 승인 완료된 날짜입니다.");
        return;
      } else if (mark.dotColor === CALENDAR_COLORS.outstanding) {
        Alert.alert("알림", "신청 대기중인 날짜입니다.");
        return;
      }
    }

    // 처리되지 않은 날짜 선택 로직 (기존 로직 유지)
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
      // 기존 스타일을 유지하면서 새로운 속성만 추가합니다.
      marked[date] = { ...datesToMark[date] };

      // dotColor가 있는 경우, selectedColor를 적용하지 않습니다.
      if (!datesToMark[date].dotColor) {
        marked[date] = {
          ...marked[date],
          selected: selectedDates.includes(date),
          selectedColor: selectedDates.includes(date) ? "blue" : undefined,
        };
      }
    }

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
